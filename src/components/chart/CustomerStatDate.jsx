import "./chart.css";
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//Đã check
const CustomerStatDate = ({ data }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showChart, setShowChart] = useState(false);

    const [startMonth, setStartMonth] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [chartType, setChartType] = useState(''); // daily or monthly

    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    const formatDate2 = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };
    const formatMonthOut = (input) => {
        const [year, month] = input.split('-');
        return `${month}/${year}`;
    };
    const formatMonth = (input) => {
        const [month, year] = input.split('/');
        return `${year}-${month}`;
    };
    const handleSearch = () => {
        setShowChart(true);
    };
    const handleChartTypeChange = (type) => {
        setShowChart(false);
        setChartType(type);
        setStartDate('');
        setEndDate('');
        setStartMonth('');
        setEndMonth('');
        setStartYear('');
        setEndYear('');

    };
    const filterDataByDateRange = (startDate, endDate) => {
        console.log("Start date:", startDate);
        console.log("End date:", endDate);
        const filteredData = data.filter(item => {
            const date = formatDate(item.bill.issuedate);
            console.log('d', date);
            return date >= startDate && date <= endDate;
        });
        return filteredData;
    };
    const filterDataByMonthRange = (startMonth, endMonth) => {
        console.log("Start month:", startMonth);
        console.log("End month:", endMonth);
        const filteredData = data.filter(item => {
            //const month = item.issuedate.substring(2, 10); // Extract year and month  substring(0, 10)
            const month = formatDate(item.bill.issuedate);
            console.log('m', month);
            return month >= startMonth && month < endMonth + 1;
        });
        return filteredData;
    };
    const filterDataByYearRange = (startYear, endYear) => {
        console.log("Start y:", startYear);
        console.log("End y:", endYear);
        const filteredData = data.filter(item => {
            //const month = item.issuedate.substring(2, 10); // Extract year and month  substring(0, 10)
            const year = item.bill.issuedate.substring(6, 10);
            console.log('y', year);
            return year >= startYear && year <= endYear;
        });
        return filteredData;
    };
    const prepareData = () => {
        let filteredData;
        if (chartType === 'daily') {
            filteredData = filterDataByDateRange(startDate, endDate);
        } else if (chartType === 'monthly') {
            filteredData = filterDataByMonthRange(startMonth, endMonth);
        }
        else {
            filteredData = filterDataByYearRange(startYear, endYear);
        }
        const dailyCustomerCount = {};
        filteredData.forEach(item => {
            const date = formatDate(item.bill.issuedate);
            console.log('filterdate', date);
            //const revenue = item.bill.totalprice;
            if (chartType === 'daily') {
                if (dailyCustomerCount[date]) {
                    dailyCustomerCount[date]++;
                } else {
                    dailyCustomerCount[date] = 1;
                }
            } else if (chartType === 'monthly') {
                const month = date.substring(0, 7); // Extract year and month
                console.log('filtermonth', month);
                if (dailyCustomerCount[month]) {
                    dailyCustomerCount[month]++;
                } else {
                    dailyCustomerCount[month] = 1;
                }
            }
            else {
                const year = date.substring(0, 4); // Extract year and month
                console.log('filteryear', year);
                if (dailyCustomerCount[year]) {
                    dailyCustomerCount[year]++;
                } else {
                    dailyCustomerCount[year] = 1;
                }
            }
        });
        const sortedDates = Object.keys(dailyCustomerCount).sort((a, b) => new Date(a) - new Date(b));
        const chartData = sortedDates.map(date => ({
            date: chartType === 'daily' ? formatDate2(date) : (chartType === 'monthly' ? formatMonthOut(date) : date),
            customers: dailyCustomerCount[date],
        }));

        return chartData;
    };
    const calculateTotalCustomers = (filteredData) => {
        let totalCustomers = 0;
        filteredData.forEach(item => {
            totalCustomers++;
        });
        return totalCustomers;
    };
    const totalDailyCustomers = calculateTotalCustomers(filterDataByDateRange(startDate, endDate));
    const totalMonthlyCustomers = calculateTotalCustomers(filterDataByMonthRange(startMonth, endMonth));
    const totalYearlyCustomers = calculateTotalCustomers(filterDataByYearRange(startYear, endYear));

    return (
        <div>
            <h2>Biểu đồ thống kê số khách hàng {chartType === 'daily' ? 'theo ngày' : (chartType === 'monthly' ? 'theo tháng' : (chartType === 'yearly' ? 'theo năm' : ''))}</h2>

            {chartType === 'daily' && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label >Từ ngày: </label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label >Đến ngày: </label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </>
            )}
            {chartType === 'monthly' && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label>Từ tháng:</label>
                        <input type="month" value={startMonth} onChange={(e) => setStartMonth(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label>Đến tháng:</label>
                        <input type="month" value={endMonth} onChange={(e) => setEndMonth(e.target.value)} />
                    </div>
                </>
            )}
            {chartType === 'yearly' && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label>Từ năm:</label>
                        <select value={startYear} onChange={(e) => setStartYear(e.target.value)}>
                            {Array.from({ length: 101 }, (_, index) => {
                                const year = 2020 + index;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label>Đến năm:</label>
                        <select value={endYear} onChange={(e) => setEndYear(e.target.value)}>
                            {Array.from({ length: 101 }, (_, index) => {
                                const year = 2020 + index;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                    </div>
                </>
            )}
            <div>
                <button className='revenue' style={{ marginLeft: '17%' }} onClick={() => handleChartTypeChange('daily')}>Theo ngày</button>
                <button className='revenue' style={{ marginLeft: '17%' }} onClick={() => handleChartTypeChange('monthly')}>Theo tháng</button>
                <button className='revenue' style={{ marginLeft: '17%' }} onClick={() => handleChartTypeChange('yearly')}>Theo năm</button>
                <button className='revenue' style={{ marginLeft: '17%', background: '#191b97', marginBottom: '40px' }} onClick={handleSearch}>Thống kê</button>
            </div>
            {showChart && (
                <div>
                    {chartType === 'daily' && (
                        <div className="textResult">
                            Tổng số khách hàng từ {formatDate2(startDate)} đến {formatDate2(endDate)}: {totalDailyCustomers} khách hàng
                        </div>
                    )}
                    {chartType === 'monthly' && (
                        <div className="textResult">
                            Tổng số khách hàng từ tháng {formatMonthOut(startMonth)} đến tháng {formatMonthOut(endMonth)}: {totalMonthlyCustomers} khách hàng
                        </div>
                    )}
                    {chartType === 'yearly' && (
                        <div className="textResult">
                            Tổng số khách hàng từ năm {startYear} đến năm {endYear}: {totalYearlyCustomers} khách hàng
                        </div>
                    )}
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={prepareData()}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="customers" fill="#5a5ccc" barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div >
    );
};






export default CustomerStatDate;
