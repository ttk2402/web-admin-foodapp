import React, { useEffect, useState } from 'react';
import "./statistical.css"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import ReviewStats from '../../components/chart/ReviewStats';

import TableOrderBy from '../../components/table/TableOrderBy';
import axios from 'axios';
import ReviewMonth from '../../components/chart/ReviewMonth';
import TableProductStats from '../../components/table/TableProductStats';
import TableCustomerStats from '../../components/table/TableCustomerStats';
const Review = () => {
    const [review, setReview] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/review/all`);

                // const sortedReview = response.data.sort((a, b) => b.id - a.id); // Sắp xếp các đơn hàng theo ID giảm dần
                // const top5Orders = sortedReview.slice(0, 5); // Chọn 5 đơn hàng đầu tiên
                // setReview(top5Orders);
                setReview(response.data);
                // console.log(top5Orders)

            } catch (error) {
                setError('Error fetching orders data. Please try again later.');

            }
        };

        fetchReviewData();

    }, []);
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar title="Thống kê đánh giá" />
                {/* <div className="widgets1">
                    {/* <Widget type="review" /> */}

                {/* <Widget type="user" /> */}
                {/* </div> */}

                <div className="charts2">
                    {/* <Featured /> */}
                    {/* <Widget type="review" />
                    <Chart /> */}
                    {/* <ReviewStats reviews={review} /> */}
                    <ReviewMonth reviews={review} />

                </div>

                <div className="listContainer">
                    {/* <div className="listTitle">
                        <ReviewMonth reviews={review} />
                    </div> */}
                    <div className="listTitle">Bảng thống kê các đánh giá theo món ăn</div>
                    {/* <TableOrderBy orders={orders} /> */}
                    <TableProductStats />
                    <div className="listTitle">Bảng thống kê các đánh giá theo khách hàng</div>
                    {/* <TableOrderBy orders={orders} /> */}
                    <TableCustomerStats />
                </div>
            </div>
        </div>
    )
}

export default Review