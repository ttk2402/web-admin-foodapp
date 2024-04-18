import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, AreaChart, XAxis, CartesianGrid, Tooltip, Area } from 'recharts';

//Đã check
const Chart = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/bill/');
                setBills(response.data);
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };
        fetchBills();
    }, []);

    const getLastSixMonths = () => {
        const months = [];
        const currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1;
        let currentYear = currentDate.getFullYear();
        for (let i = 0; i < 6; i++) {
            if (currentMonth === 0) {
                currentMonth = 12;
                currentYear -= 1;
            }
            months.unshift(`${currentMonth < 10 ? '0' + currentMonth : currentMonth}/${currentYear}`);
            currentMonth -= 1;
        }
        return months;
    };

    const calculateRevenueByMonth = () => {
        const lastSixMonths = getLastSixMonths();
        const revenueByMonth = {};
        bills.forEach(bill => {
            const [day, month, year] = bill.issuedate.split('/');
            const formattedDate = `${month}/${year}`;
            if (lastSixMonths.includes(formattedDate)) {
                if (!revenueByMonth[formattedDate]) {
                    revenueByMonth[formattedDate] = 0;
                }
                revenueByMonth[formattedDate] += bill.totalprice;
            }
        });
        return lastSixMonths.map(month => ({
            name: month,
            total: revenueByMonth[month] || 0
        }));
    };

    return (
        <div className='chart'>
            <h1 className="title">Doanh thu 6 tháng gần đây</h1>
            <ResponsiveContainer width="100%" aspect={8 / 2}>
                <AreaChart
                    width={730}
                    height={250}
                    data={calculateRevenueByMonth()}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
export default Chart;
