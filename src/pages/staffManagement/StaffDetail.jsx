import "../../css/mngtDetail.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import Chart from "../../../components/chart/Chart";
import TableOrderBy from "../../components/table/TableOrderBy";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StaffDetail = () => {
    const { staffId } = useParams();

    const [staff, setStaff] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Assume fetchData là hàm để lấy dữ liệu sản phẩm từ một nguồn dữ liệu nào đó
        const fetchData = async () => {
            try {
                // Thực hiện lấy dữ liệu sản phẩm dựa trên productId
                //const response = await fetch(`api/product/${productId}`);
                const response = await axios.get(`http://localhost:8080/api/account/get/${staffId}`);

                if (response.status === 200) {
                    const contentType = response.headers['content-type'];
                    if (contentType && contentType.includes('application/json')) {
                        setStaff(response.data);
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

        fetchData();

        // Không cần cleanup effect ở đây vì chúng ta không có sử dụng subscriptions hoặc timers
    }, [staffId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!staff) {
        return <div>No product found.</div>;
    }

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <Link to={`/admin/staffManagement`} className="arrow-back-icon" style={{ textDecoration: "none" }}>
                    <ArrowBackIcon />

                </Link>
                <div className="top">
                    <div className="left">
                        <Link to={`/admin/staffManagement/editStaff/${staffId}`} style={{ textDecoration: "none" }}>
                            <div className="editButton">Chỉnh sửa</div>
                        </Link>
                        <h1 className="title">Thông tin nhân viên</h1>
                        <div className="item">

                            <div className="details">
                                {/* <h1 className="itemTitle">NV1</h1> */}
                                <div className="detailItem">
                                    <span className="itemKey">Họ:</span>
                                    <span className="itemValue">{staff.firstname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Tên:</span>
                                    <span className="itemValue">{staff.lastname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Số điện thoại:</span>
                                    <span className="itemValue">{staff.phonenumber}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{staff.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Mật khẩu:</span>
                                    <span className="itemValue">{staff.password}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Địa chỉ:</span>
                                    <span className="itemValue">
                                        {staff.address ? (
                                            <span>
                                                {/* {staff.address.street}, {staff.address.ward}, {staff.address.district}, {staff.address.province} */}
                                                {staff.address.street ? staff.address.street + ', ' : '_, '}
                                                {staff.address.ward ? staff.address.ward + ', ' : '_, '}
                                                {staff.address.district ? staff.address.district + ', ' : '_, '}
                                                {staff.address.province ? staff.address.province + '.' : '_'}
                                            </span>
                                        ) : (
                                            <span></span>
                                        )}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Trạng thái:</span>
                                    <span className="itemValue">{staff.account_status.status === 'Active' ? 'Hoạt động' : 'Khóa'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="right">
                        <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
                    </div> */}
                </div>
                <div className="bottom">
                    <h1 className="title">Đơn hàng gần nhất</h1>
                    <TableOrderBy />
                </div>
            </div>
        </div>
    );
};

export default StaffDetail;
