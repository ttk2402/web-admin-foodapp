
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "../../css/mngtForm.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { discountInputs } from "../../data/dataFormDiscountMngt";

const EditDiscount = () => {
    //const [inputs] = useState(discountInputs);
    const { discountId } = useParams();
    const navigate = useNavigate();
    const [discount, setDiscount] = useState({
        code: '',
        percent: '',
        startdate: '',
        enddate: '',
        isExist: '',
    });

    const [message, setMessage] = useState('');
    // const [error, setError] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);

    const getFormatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };
    const putFormatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };
    useEffect(() => {
        fetchData();
        if (showProgressBar) {
            const timer = setTimeout(() => {
                setMessage('');
                setShowProgressBar(false);
            }, 2000); // Thời gian hiển thị thanh thời gian chạy: 3000ms
            return () => clearTimeout(timer);
        }
    }, [discountId, showProgressBar]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/discount/all`);
            const foundDiscount = response.data.find((discount) => discount.id === parseInt(discountId));
            const getFormattedDiscount = {
                ...foundDiscount,
                startdate: getFormatDate(foundDiscount.startdate),
                enddate: getFormatDate(foundDiscount.enddate)
            };
            setDiscount(getFormattedDiscount);
            //console.log(foundDiscount)


        } catch (error) {
            console.error('Error fetching product data:', error);
            setMessage('Có lỗi xảy ra khi lấy dữ liệu');
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // let formattedValue = value;
        // if (name === "startdate" || name === "enddate") {
        //     // Chuyển đổi định dạng ngày tháng từ dd/MM/yyyy sang yyyy-MM-dd
        //     const parts = value.split("/");
        //     formattedValue = `${parts[2]}-${parts[1]}-${parts[0]}`;
        // }

        //chuyển 0.2 => 20%
        // let processedValue = value; // Giữ nguyên giá trị nếu không phải trường percent

        // if (name === "percent") {
        //     // Nếu trường là percent, thực hiện phép nhân với 100 trước khi gán giá trị
        //     processedValue = parseFloat(value) * 100;
        // }
        setDiscount({
            ...discount,
            // [name]: processedValue
            [name]: value
        });
    };
    const handleSubmitEditDiscount = async (event) => {
        event.preventDefault();
        setShowProgressBar(true);
        try {
            const putFormattedDiscount = {
                ...discount,
                startdate: putFormatDate(discount.startdate),
                enddate: putFormatDate(discount.enddate)
            };
            //const percentToSend = parseFloat(discount.percent) / 100; 
            const response = await axios.put(`http://localhost:8080/api/discount/${discountId}`, putFormattedDiscount);
            //{ ...discount,
            // percent: percentToSend});
            if (response.status === 200) {
                setMessage('Cập nhật khuyến mãi thành công.');
                setDiscount(prevDiscount => ({ ...prevDiscount, ...discount }));
                setTimeout(() => {
                    navigate('/admin/discountManagement');
                }, 1500);
            } else {
                setMessage('Cập nhật khuyến mãi thất bại.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage('Có lỗi xảy ra khi lấy dữ liệu.');
        }
    };
    if (!discount) {
        return null; // hoặc thực hiện các xử lý khác tùy thuộc vào yêu cầu của bạn
    }
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar title={"Chỉnh sửa thông tin khuyến mãi"} />
                <Link to={`/admin/discountManagement`} className="arrow-back-icon" style={{ textDecoration: "none" }}>

                    <ArrowBackIcon />

                </Link>
                <div className="bottom">
                    <div className="column2">
                        <div className="column">
                            <form onSubmit={handleSubmitEditDiscount}>
                                <div className="formInput">
                                    <label>Tên khuyến mãi:</label>
                                    <input type="text" name="code" value={discount.code} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Giá trị (%):</label>
                                    <input type="text" name="percent" value={discount.percent} onChange={handleChange} />
                                    {/* {discount.percent*100} */}
                                </div>
                                <div className="formInput">
                                    <label>Ngày bắt đầu:</label>
                                    <input type="date" name="startdate" value={discount.startdate} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Ngày kết thúc:</label>
                                    <input type="date" name="enddate" value={discount.enddate} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Trạng thái:</label>
                                    {/* <input type="text" name="url_image_category" value={category.url_image_category} onChange={handleChange} /> */}
                                    <select name="isExist" value={discount.isExist} onChange={handleChange}>
                                        <option>Chọn 1 trong 2 trạng thái</option> {/* Mục mặc định */}
                                        <option value={true}>true</option>
                                        <option value={false}>false</option>
                                    </select>
                                </div>

                                {/* {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} value={input.value} />
                                </div>
                            ))} */}
                                <button type="submit" >Cập nhật</button>
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

export default EditDiscount;
