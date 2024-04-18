
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "../../css/mngtForm.css";


import React, { useState, useEffect } from 'react';
//import { discountInputs } from "../../data/dataFormDiscountMngt";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddDiscount = () => {
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [percent, setPercent] = useState('');
    const [isExist, setIsExist] = useState('true');
    const [startdate, setStartdate] = useState('');
    const [enddate, setEnddate] = useState('');
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

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };
    const handlePercentChange = (event) => {
        setPercent(event.target.value);

    };
    const handleIsExistChange = (event) => {
        setIsExist(event.target.value);

    };
    const handleStartdateChange = (event) => {
        setStartdate(event.target.value);

    };
    const handleEnddateChange = (event) => {
        setEnddate(event.target.value);

    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowProgressBar(true);
        try {
            const formattedStartdate = formatDate(startdate);
            const formattedEnddate = formatDate(enddate);
            const response = await axios.post('http://localhost:8080/api/discount/add', { code, percent, isExist, startdate: formattedStartdate, enddate: formattedEnddate });
            // percent: percent / 100
            if (response.status === 201) {
                setMessage('Tạo khuyến mãi thành công!');
                setCode('');
                setPercent('');
                setStartdate('');
                setEnddate('');

                setTimeout(() => {

                    navigate('/admin/discountManagement');
                }, 2000); // Hiển
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
                {/* <div className="title top">
                    <h1>Thêm khuyến mãi</h1>
                </div> */}
                <div className="bottom">
                    <div className="column2">
                        <div className="column">
                            <div className="title top">
                                <h1>Thêm khuyến mãi</h1>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <div className="formInput">
                                    <label>Khuyến mãi:</label>
                                    <input type="text" value={code} placeholder="KM02" onChange={handleCodeChange} required />
                                </div>
                                <div className="formInput">
                                    <label>Giá trị (%):</label>
                                    <input type="text" value={percent} placeholder="0.2" onChange={handlePercentChange} required />
                                </div>
                                <div className="formInput">
                                    <label>Ngày bắt đầu:</label>
                                    <input type="date" value={startdate} onChange={handleStartdateChange} required />
                                </div>
                                <div className="formInput">
                                    <label>Ngày kết thúc:</label>
                                    <input type="date" value={enddate} onChange={handleEnddateChange} required />
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
        </div>

    );
};

export default AddDiscount;
