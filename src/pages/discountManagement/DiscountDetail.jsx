import "../../css/mngtDetail.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import Chart from "../../../components/chart/Chart";

import { Link, useParams } from "react-router-dom";
//import { discountInputs } from "../../data/dataFormDiscountMngt";
import React, { useState, useEffect } from 'react';
import axios from "axios";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableOrderBy from "../../components/table/TableOrderBy";
const DiscountDetail = () => {
    const { discountCode } = useParams();
    //console.log(discountCode)
    const [discountId, setDiscountId] = useState();
    const [discount, setDiscount] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        // Assume fetchData là hàm để lấy dữ liệu sản phẩm từ một nguồn dữ liệu nào đó
        const fetchData = async () => {
            try {
                // Thực hiện lấy dữ liệu sản phẩm dựa trên productId
                //const response = await fetch(`api/product/${productId}`);
                const response = await axios.get(`http://localhost:8080/api/discount/${discountCode}`);

                if (response.status === 200) {

                    const contentType = response.headers['content-type'];
                    if (contentType && contentType.includes('application/json')) {
                        setDiscount(response.data);
                        setDiscountId(response.data.id)
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
        const fetchOrdersData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/order/all`);

                const foundOrderAcc = response.data.filter((order) => order.discount?.id === discountId);
                // setOrders(foundOrderAcc);
                if (foundOrderAcc.length > 0) {
                    const sortedOrders = foundOrderAcc.sort((a, b) => b.id - a.id); // Sắp xếp các đơn hàng theo ID giảm dần
                    const top5Orders = sortedOrders.slice(0, 5); // Chọn 5 đơn hàng đầu tiên
                    setOrders(top5Orders);
                } else {
                    setOrders([]);
                }
                console.log(foundOrderAcc)
                console.log("dl")
                setLoading(false);
            } catch (error) {
                setError('Error fetching orders data. Please try again later.');
                setLoading(false);
            }
        };
        fetchData();
        fetchOrdersData();
        // Không cần cleanup effect ở đây vì chúng ta không có sử dụng subscriptions hoặc timers
    }, [discountCode, discountId]);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    if (!discount) {
        return <div>Không tìm thấy khuyến mãi.</div>;
    }

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <Link to={`/admin/discountManagement`} className="arrow-back-icon" style={{ textDecoration: "none" }}>
                    <ArrowBackIcon />

                </Link>
                <div className="top">
                    <div className="left">
                        <Link to={`/admin/discountManagement/editDiscount/${discount.id}`} style={{ textDecoration: "none" }}>
                            <div className="editButton">Chỉnh sửa</div>
                        </Link>

                        <h1 className="title">Thông tin khuyến mãi</h1>
                        <div className="item">

                            <div className="details">
                                <h1 className="itemTitle">{discountCode}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Giá trị (%):</span>
                                    <span className="itemValue">{discount.percent * 100}%</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Ngày bắt đầu:</span>
                                    <span className="itemValue">{discount.startdate}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Ngày kết thúc:</span>
                                    <span className="itemValue">{discount.enddate}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Trạng thái:</span>
                                    <span className="itemValue" >  {discount.isExist === true ? 'Đang áp dụng' : 'Hết mã '}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div className="right">
                        <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
                    </div> */}
                </div>
                <div className="bottom">
                    <h1 className="title">Đơn hàng đã áp dụng khuyến mãi</h1>
                    <TableOrderBy orders={orders} />
                </div>
            </div>
        </div>
    );
};

export default DiscountDetail;
