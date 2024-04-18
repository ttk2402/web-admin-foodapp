import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "../../css/mngtForm.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useNavigate, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        url_image_product: '',
        price: '',
        description: '',
        category_id: '',
        category_title: '' // Thêm trường này để lưu tên danh mục
    });

    const [message, setMessage] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);

    useEffect(() => {
        fetchData();
        if (showProgressBar) {
            const timer = setTimeout(() => {
                setMessage('');
                setShowProgressBar(false);
            }, 2000); // Thời gian hiển thị thanh thời gian chạy: 3000ms
            return () => clearTimeout(timer);
        }
    }, [productId, showProgressBar]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product/${productId}`);
            const response2 = await axios.get('http://localhost:8080/api/category/');
            setCategories(response2.data);

            // Lấy tên danh mục từ category_id
            const foundCategory = response2.data.find(category => category.id === response.data.category_id);
            const categoryTitle = foundCategory ? foundCategory.title : '';
            setProduct({
                ...response.data,
                category_title: categoryTitle // Lưu tên danh mục vào state
            });
        } catch (error) {
            console.error('Error fetching product data:', error);
            setMessage('Có lỗi xảy ra khi lấy dữ liệu.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmitAddProduct = async (event) => {
        event.preventDefault();
        setShowProgressBar(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/product/${productId}`, product);
            if (response.status === 200) {
                setMessage('Cập nhật món ăn thành công.');
                setTimeout(() => {
                    navigate('/admin/productManagement');
                }, 2000);
            } else {
                setMessage('Cập nhật món ăn thất bại.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage('Có lỗi xảy ra khi lấy dữ liệu.');
        }
    };
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />


                <Link to={`/admin/productManagement`} className="arrow-back-icon" style={{ textDecoration: "none" }}>
                    <ArrowBackIcon />
                </Link>


                <div className="bottom">
                    <div className="column2">
                        <div className="column">
                            <div className="title top">
                                <h1>Chỉnh sửa món ăn</h1>
                            </div>
                            <form onSubmit={handleSubmitAddProduct}>
                                <div className="formInput">
                                    <label>Tên món ăn:</label>
                                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Đường dẫn hình ảnh món ăn:</label>
                                    <input type="text" name="url_image_product" value={product.url_image_product} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Giá:</label>
                                    <input type="text" name="price" value={product.price} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Danh mục:</label>
                                    <select name="category_id" value={product.category ? product.category.id : ''} onChange={handleChange}>
                                        <option>Chọn 1 trong số các danh mục sau</option> {/* Mục mặc định */}
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="formInput">
                                    <label>Mô tả:</label>
                                    <textarea name="description" value={product.description} onChange={handleChange} />
                                </div>
                                <button type="submit">Cập nhật</button>
                            </form>
                            {message && (
                                <div className="success-message">
                                    {message}
                                    {showProgressBar && <div className="progress-bar" />}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
