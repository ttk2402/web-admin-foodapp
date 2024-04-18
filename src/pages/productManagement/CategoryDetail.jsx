import "../../css/mngtDetail.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import Chart from "../../../components/chart/Chart";


import { Link, useParams } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import axios from "axios";

const ProductDetail = () => {
    const { productId } = useParams(); // Lấy productId từ URL

    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Assume fetchData là hàm để lấy dữ liệu sản phẩm từ một nguồn dữ liệu nào đó
        const fetchData = async () => {
            try {
                // Thực hiện lấy dữ liệu sản phẩm dựa trên productId
                //const response = await fetch(`api/product/${productId}`);
                const response = await axios.get(`http://localhost:8080/api/product/${productId}`);

                if (response.status === 200) {
                    const contentType = response.headers['content-type'];
                    if (contentType && contentType.includes('application/json')) {
                        setProduct(response.data);
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
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>No product found.</div>;
    }
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <Link to="/admin/productManagement/editProduct" style={{ textDecoration: "none" }}>
                            <div className="editButton">Chỉnh sửa</div>
                        </Link>
                        <h1 className="title">Thông tin món ăn</h1>
                        <div className="item">
                            <img
                                src={product.url_image_product}
                                alt=""
                                className="itemImg"
                            />
                            <div className="details">
                                <h1 className="itemTitle">{product.name}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Giá:</span>
                                    <span className="itemValue">{product.price}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phân loại:</span>
                                    <span className="itemValue">{product.category_id}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Mô tả:</span>
                                    <span className="itemValue">
                                        {product.description}
                                    </span>
                                </div>
                                {/* <div className="detailItem">
                                    <span className="itemKey">Trạng thái:</span>
                                    <span className="itemValue">{product.description}</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* bảng số liệu bán hàng của món ăn */}
                    {/* <div className="right">
                        <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
                    </div> */}
                </div>
                <div className="bottom">
                    <h1 className="title">Đánh giá</h1>
                    <div className="details">
                        <h1 className="itemTitleCmt">Tên KH</h1>
                        <div className="detailItem">
                            <span className="itemKey">Số sao:</span>
                            <span className="itemValue"></span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Đánh giá:</span>
                            <span className="itemValue"></span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
