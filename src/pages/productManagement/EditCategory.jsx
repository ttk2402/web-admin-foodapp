import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "../../css/mngtForm.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useNavigate, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditCategory = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    //const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({
        title: '',
        url_image_category: '',
    });

    const [message, setMessage] = useState('');
    // const [error, setError] = useState('');
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
    }, [categoryId, showProgressBar]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/category/${categoryId}`);
            // const response2 = await axios.get('http://localhost:8080/api/category/');
            setCategory(response.data);

            // Lấy tên danh mục từ category_id
            // const foundCategory = response2.data.find(category => category.id === response.data.category_id);
            // const categoryTitle = foundCategory ? foundCategory.title : '';
            // setProduct({
            //     ...response.data,
            //     category_title: categoryTitle // Lưu tên danh mục vào state
            // });
        } catch (error) {
            console.error('Error fetching product data:', error);
            setMessage('Có lỗi xảy ra khi lấy dữ liệu');
        }
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/api/category/${categoryId}`);
    //             setCategory(response.data);

    //             // Lấy tên danh mục từ category_id
    //             const foundCategory = await axios.get(`http://localhost:8080/api/category/${response.data.category_id}`);
    //             const categoryTitle = foundCategory ? foundCategory.title : '';
    //             setProduct({
    //                 ...response.data,
    //                 category_title: categoryTitle // Lưu tên danh mục vào state
    //             });
    //         } catch (error) {
    //             console.error('Error fetching product data:', error);
    //             setMessage('Có lỗi xảy ra khi lấy dữ liệu');
    //         }
    //     };

    //     fetchData();
    //     if (showProgressBar) {
    //         const timer = setTimeout(() => {
    //             setMessage('');
    //             setShowProgressBar(false);
    //         }, 2000); // Thời gian hiển thị thanh thời gian chạy: 3000ms
    //         return () => clearTimeout(timer);
    //     }
    // }, [categoryId, showProgressBar, fetchData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        });
    };

    const handleSubmitEditCategory = async (event) => {
        event.preventDefault();
        setShowProgressBar(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/category/${categoryId}`, category);
            if (response.status === 200) {
                setMessage('Cập nhật danh mục thành công.');
                setTimeout(() => {
                    navigate('/admin/productManagement');
                }, 1500);
            } else {
                setMessage('Cập nhật danh mục thất bại.');
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
                                <h1>Chỉnh sửa danh mục</h1>
                            </div>
                            <form onSubmit={handleSubmitEditCategory}>
                                <div className="formInput">
                                    <label>Tên danh mục:</label>
                                    <input type="text" name="title" value={category.title} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Đường dẫn hình ảnh món ăn:</label>
                                    <input type="text" name="url_image_category" value={category.url_image_category} onChange={handleChange} />
                                </div>

                                <button type="submit">Cập nhật</button>
                            </form>
                            {message && (
                                <div className="success-message">
                                    {message}
                                    {showProgressBar && <div className="progress-bar" />}
                                </div>
                            )}
                            {/* {error && <div className="error-message">{error}</div>} */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;
