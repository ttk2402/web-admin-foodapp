import React, { useEffect, useState } from 'react';
import "../statistical/statistical.css"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import TableOrderBy from '../../components/table/TableOrderBy';
import axios from 'axios';
const Home = () => {
    const [orders, setOrders] = useState([]);
    const [revenue, setRevenue] = useState(null);
    const [revenueToday, setRevenueToday] = useState(0);
    const [expectedRevenue, setexpRevenue] = useState(500000);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/order/all`);

                const sortedOrders = response.data.sort((a, b) => b.id - a.id); // Sắp xếp các đơn hàng theo ID giảm dần
                const top5Orders = sortedOrders.slice(0, 5); // Chọn 5 đơn hàng đầu tiên
                setOrders(top5Orders);

                console.log(top5Orders)

            } catch (error) {
                setError('Error fetching orders data. Please try again later.');

            }
        };

        const fetchData = async () => {
            try {
                // Thực hiện lấy dữ liệu sản phẩm dựa trên productId
                //const response = await fetch(`api/product/${productId}`);
                const response = await axios.get(`http://localhost:8080/api/bill/revenue/`);

                if (response.status === 200) {
                    const contentType = response.headers['content-type'];
                    if (contentType && contentType.includes('application/json')) {
                        setRevenue(response.data.revenue);
                        console.log(response.data)
                    } else {
                        throw new Error('Invalid content type');
                    }
                } else {
                    throw new Error('Network response was not ok');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError('Error fetching product data. Please try again later.');
                setLoading(false);
            }
        };
        const fetchTodayRevenue = async () => {
            try {
                const today = new Date();
                console.log('getdate', today)
                const response = await axios.get('http://localhost:8080/api/bill/');
                console.log('data', response.data)
                if (!Array.isArray(response.data)) {
                    throw new Error('Data returned from API is not an array');
                }
                const todayOrders = response.data.filter(order => {
                    // Chuyển đổi định dạng ngày thành yyyy-mm-dd để so sánh
                    // const [day, month, year] = order.issuedate.split('/');
                    // const formattedDate = `${year}-${month}-${day}`;
                    // console.log('d', formattedDate)
                    // return formattedDate === today.toISOString().slice(0, 10);
                    const [day, month, year] = order.issuedate.split('/');
                    const orderDate = new Date(`${year}-${month}-${day}`);
                    console.log('d', orderDate)
                    return (
                        orderDate.getDate() === today.getDate() &&
                        orderDate.getMonth() === today.getMonth() &&
                        orderDate.getFullYear() === today.getFullYear()
                    );
                });
                const todayRevenue = todayOrders.reduce((total, order) => total + order.totalprice, 0);
                console.log('to', todayRevenue)
                setRevenueToday(todayRevenue);
            } catch (error) {
                setError('Error fetching today revenue. Please try again later.');
            }
        };



        fetchTodayRevenue();
        fetchData();
        fetchOrdersData();

    }, []);
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar title="FOODIE-ADMIN" />
                <div className="widgets">
                    <Widget type="product" />
                    <Widget type="order" />
                    <Widget type="discount" />
                    <Widget type="user" />
                    <Widget type="review" />
                </div>
                <div className="charts">
                    <Featured revenue={revenueToday} expected={expectedRevenue} type="revenueToday" />
                    <Chart />
                </div>

                <div className="listContainer">
                    <div className="listTitle">Đơn hàng gần đây</div>
                    <TableOrderBy orders={orders} />
                </div>
            </div>
        </div>
    )
}

export default Home