import React, { useEffect, useState } from 'react';
import "./statistical.css"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import TableOrderBy from '../../components/table/TableOrderBy';
import axios from 'axios';
import RevenueDateChart from '../../components/chart/RevenueDateChart';
import CustomerStatDate from '../../components/chart/CustomerStatDate';
import ReviewDate from './reviewDate';
import LoyalCustomer from '../../components/table/tableLoyalCustomer';
const CustomerStat = () => {
    const [customerOrder, setCustomerOrder] = useState([]);
    //const [revenueDate, setRevenueDate] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/order/all`);

                setCustomerOrder(response.data);

                console.log(response.data)

            } catch (error) {
                setError('Error fetching orders data. Please try again later.');

            }
        };

        fetchOrdersData();

    }, []);
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar title="Thống kê khách hàng" />
                {/* <div className="widgets">
                    <Widget type="product" />
                    <Widget type="order" />
                    <Widget type="discount" />
                    <Widget type="user" />

                </div> */}
                {/* <div className="charts"> */}
                {/* <Featured /> */}
                {/* <Chart /> */}

                {/* </div> */}

                <div className="listRevenue">

                    {/* <div className="listTitle">Đơn hàng gần đây</div> */}
                    {/* <TableOrderBy orders={orders} /> */}
                    < CustomerStatDate data={customerOrder} />

                </div>
                <div className="listContainer">
                    <div className="listTitle">Bảng thống kê các khách hàng thân thiết</div>
                    <LoyalCustomer />
                </div>
                {/* <div className="listRevenue">
                    < RevenueDateChart data={revenueDate} />
                </div>
                <div className="listRevenue">
                    < RevenueDateChart data={revenueDate} />
                </div> */}
            </div>
        </div>
    )
}


export default CustomerStat;