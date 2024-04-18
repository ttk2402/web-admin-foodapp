import React, { useEffect, useState } from 'react';
import "./statistical.css"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
//import TableOrderBy from '../../components/table/TableOrderBy';
import axios from 'axios';
import TableProduct from '../../components/table/TableProduct';

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import ProductPieChart from '../../components/chart/PieChart';
// ChartJS.register(ArcElement, Tooltip, Legend);

const TopSellingProduct = () => {


    const [topSelling, setTopSelling] = useState([]);

    const [error, setError] = useState(null);
    const [dailySales, setDailySales] = useState(0);
    const [expectedRevenue, setexpRevenue] = useState(80);
    const [totalSales, setTotalSales] = useState(0);

    const [amountPro, setAmountPro] = useState(0);
    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/product/');
                setAmountPro(response.data.length); // Đếm số lượng từ dữ liệu nhận được
                console.log('allpro', response.data)
                const productSalesPromises = response.data.map(async product => {
                    const salesResponse = await axios.get(`http://localhost:8080/api/order/purchases/${product.id}`);
                    console.log('allorder', salesResponse.data)
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        value: salesResponse.data
                    };
                });
                const productSalesData = await Promise.all(productSalesPromises);
                const sortedProductData = productSalesData.sort((a, b) => b.value - a.value);
                setTopSelling(sortedProductData);
                const total = sortedProductData.reduce((acc, cur) => acc + cur.value, 0);
                setTotalSales(total);
                console.log(sortedProductData)
            } catch (error) {
                console.error('Error fetching product sales:', error);
            }
        };
        const fetchDailySales = async () => {
            try {
                const today = new Date().toLocaleDateString("en-GB"); // Lấy ngày hiện tại (dd/mm/yyyy)
                const response = await axios.get(`http://localhost:8080/api/order/all`);

                if (response.status === 200) {
                    const salesToday = response.data.filter(order => order.orderdate === today);
                    const totalQuantity = salesToday.reduce((acc, order) => {
                        return acc + order.items.reduce((acc, item) => acc + item.quantity, 0);
                    }, 0);
                    setDailySales(totalQuantity);

                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error fetching daily sales:', error);
                setError('Error fetching daily sales. Please try again later.');

            }
        };

        fetchDailySales();
        fetchOrdersData();
        // fetchProductData();

    }, []);
    if (error) {
        return <div>{error}</div>;
    }

    // const options = {
    //     responsive: true,
    //     maintainAspectRatio: true, // Tắt giữ tỷ lệ khung hình
    //     width: 400,
    //     height: 400,
    //     plugins: {
    //         legend: {
    //             position: 'right', // Đặt chữ ký ở phía dưới của biểu đồ
    //             labels: {
    //                 maxWidth: 200 // Giới hạn chiều rộng tối đa của chữ ký
    //             }
    //         }
    //     }
    // };
    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar title="Thống kê món ăn bán chạy" />
                {/* <div className="widgets1">
                    <Widget type="product" />
                    {/* <Widget type="order" />
                    <Widget type="discount" />
                    <Widget type="user" /> */}

                {/* </div>  */}
                <div className="charts">

                    <Featured revenue={dailySales} expected={expectedRevenue} type="totalProToday" />
                    {/* <Chart /> */}


                    {/* <Pie data={data} options={options} /> */}
                    <ProductPieChart />

                </div>

                <div className="listContainer">
                    <div className="listTitle">Danh sách mức độ bán chạy của các Món ăn ({amountPro})</div>
                    <TableProduct orders={topSelling} totalPro={totalSales} />
                </div>
            </div>
        </div >
    )
}

export default TopSellingProduct