
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../css/mngtForm.css";

//import { useState } from "react";
//import { productInputs } from "../../data/dataFormProductMngt";

const AddCategory = () => {
    //const [inputs] = useState(productInputs);

    // const inputs = [

    //     {
    //         id: 1,
    //         label: "Tên",
    //         type: "text",
    //         placeholder: "",
    //         value: "Kem socola",
    //     },
    //     {
    //         id: 2,
    //         label: "Đường dẫn đến hình ảnh",
    //         type: "text",
    //         placeholder: "",
    //         value: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/c/4/c400652c2a03e0-chocolateicecream01.png",
    //     },
    // {
    //     id: 3,
    //     label: "Giá",
    //     type: "text",
    //     placeholder: "",
    //     value: "7000",
    // },
    // {
    //     id: 4,
    //     label: "Phân loại",
    //     type: "text",
    //     placeholder: "",
    //     value: "Tráng miệng",
    // },
    // {
    //     id: 5,
    //     label: "Mô tả",
    //     type: "text",
    //     placeholder: "",
    //     value: "Vị socola",
    // },

    //]
    const [title, setTitle] = useState('');
    const [url_image_category, setImg] = useState('');
    const [message, setMessage] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);

    useEffect(() => {
        if (showProgressBar) {
            const timer = setTimeout(() => {
                setMessage('');
                setShowProgressBar(false);
            }, 1500); // Thời gian hiển thị thanh thời gian chạy: 3000ms
            return () => clearTimeout(timer);
        }
    }, [showProgressBar]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleImgChange = (event) => {
        setImg(event.target.value);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowProgressBar(true);
        try {
            const response = await axios.post('http://localhost:8080/api/category/add', { title, url_image_category });
            if (response.status === 201) {
                setMessage('Tạo Danh mục món ăn thành công!');
                setTitle('');
                setImg('');

                // // Tự động xóa thông báo sau 3 giây
                // setTimeout(() => {
                //     setMessage('');
                // }, 3000);
            } else {
                setMessage('Tạo thất bại.');
            }
        } catch (error) {
            console.error('Error adding category:', error);
            setMessage('Có lỗi xảy ra.');
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="title top">
                    <h1>Thêm danh mục</h1>
                </div>
                <div className="bottom">
                    <div className="column">
                        <form onSubmit={handleSubmit}>
                            {/* tải ảnh từ máy */}
                            {/* <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div> */}

                            {/* {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} />
                                </div>
                            ))} */}

                            <div>
                                <label>Tên danh mục:</label>
                                <input type="text" value={title} onChange={handleTitleChange} required />
                            </div>
                            <div>
                                <label>Đường dẫn đến hình ảnh:</label>
                                <input type="text" value={url_image_category} onChange={handleImgChange} required />
                            </div>
                            <button type="submit" >Thêm</button>
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

    );
};

export default AddCategory;
