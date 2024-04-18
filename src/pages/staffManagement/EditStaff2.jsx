import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../../css/mngtForm.css";
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const EditStaff2 = () => {
    const { staffId } = useParams();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const [message, setMessage] = useState('');
    const [messageErr, setMessageErr] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [errorsShown, setErrorsShown] = useState({});

    const [dataLoaded, setDataLoaded] = useState(false); // Biến để kiểm tra xem dữ liệu đã được tải hay chưa

    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/account/get/${staffId}`);

            setUserData(response.data);
            setDataLoaded(true); // Đánh dấu rằng dữ liệu đã được tải
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Có lỗi xảy ra khi lấy dữ liệu');
        }
    };

    useEffect(() => {
        if (!dataLoaded) {
            fetchData();
        }

        if (showProgressBar) {
            const timer = setTimeout(() => {
                setMessage('');
                setShowProgressBar(false);
            }, 2000); // Thời gian hiển thị thanh thời gian chạy: 3000ms
            return () => clearTimeout(timer);
        }

    }, [showProgressBar, dataLoaded]);

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .nullable()
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    'Hãy nhập email đúng định dạng'
                ),
            firstName: Yup.string()
                .required('Họ không được bỏ trống.')
                .min(2, 'Họ phải có ít nhất 2 ký tự.'),
            lastName: Yup.string()
                .required('Tên không được bỏ trống.')
                .min(2, 'Tên phải có ít nhất 2 ký tự.'),
            phoneNumber: Yup.string()
                .required('Số điện thoại không được bỏ trống.')
                .matches(
                    /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    'Số điện thoại phải hợp lệ (có 10 số).'
                ),
        }),
        onSubmit: async (values) => {
            setShowProgressBar(true);
            try {
                const response = await axios.put(`http://localhost:8080/api/account/${staffId}`, {
                    email: values.email,
                    firstname: values.firstName,
                    lastname: values.lastName,
                    phonenumber: values.phoneNumber,
                });
                if (response.status === 200) {
                    if (response.data.id) {
                        setMessage('Cập nhật thông tin nhân viên thành công.');
                        setTimeout(() => {

                            navigate('/staffManagement');
                        }, 2000);
                    } else {
                        setMessageErr('Số điện thoại và mật khẩu đã được sử dụng.');
                    }
                } else {
                    setMessageErr('Cập nhật thông tin nhân viên thất bại.');
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
                setMessageErr('Đã xảy ra lỗi khi gửi yêu cầu.');
            }
        },
    });

    useEffect(() => {
        if (userData) {
            formik.setValues({
                email: userData.email || '',
                firstName: userData.firstname || '',
                lastName: userData.lastname || '',
                phoneNumber: userData.phonenumber || '',
            });
        }
    }, [userData]);

    if (!userData) return <p>Loading...</p>;


    const handleInputChange = (event) => {
        // Khi có sự kiện thay đổi trường input, kiểm tra lỗi và cập nhật trạng thái lỗi
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        const fieldError = formik.errors[fieldName];

        // Kiểm tra và cập nhật lỗi ngay khi có sự thay đổi
        setErrorsShown({
            ...errorsShown,
            [fieldName]: fieldError,
        });

        formik.handleChange(event);
    };

    const handleInputBlur = (fieldName) => {
        // Khi blur ra khỏi trường input, kiểm tra và hiển thị lỗi nếu có
        const fieldError = formik.errors[fieldName];
        setErrorsShown({
            ...errorsShown,
            [fieldName]: fieldError,
        });
    };
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar title="Chỉnh sửa thông tin nhân viên" />
                <Link to={`/staffManagement`} className="arrow-back-icon" style={{ textDecoration: "none" }}>
                    <ArrowBackIcon />
                </Link>
                <div className="bottom">
                    <section>
                        <form className="newUserForm" onSubmit={formik.handleSubmit}>
                            <label>Email</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                value={formik.values.email}
                                onChange={handleInputChange}
                                onBlur={() => handleInputBlur('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <p className="errorMsg"> {formik.errors.email} </p>
                            ) : errorsShown.email && <p className="errorMsg">{errorsShown.email}</p>}

                            <label>Họ</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                onChange={handleInputChange}
                                value={formik.values.firstName}
                                onBlur={() => handleInputBlur('firstName')}
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <p className="errorMsg"> {formik.errors.firstName} </p>

                            ) : errorsShown.firstName && (<p className="errorMsg">{errorsShown.firstName}</p>)}

                            <label>Tên</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                onChange={handleInputChange}
                                value={formik.values.lastName}
                                onBlur={() => handleInputBlur('lastName')}
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <p className="errorMsg"> {formik.errors.lastName} </p>
                            ) : errorsShown.lastName && <p className="errorMsg">{errorsShown.lastName}</p>}
                            <label>Số điện thoại</label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                onChange={handleInputChange}
                                value={formik.values.phoneNumber}
                                onBlur={() => handleInputBlur('phoneNumber')}
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <p className="errorMsg"> {formik.errors.phoneNumber} </p>
                            ) : errorsShown.phoneNumber && <p className="errorMsg">{errorsShown.phoneNumber}</p>}

                            <button type="submit">Cập nhật</button>
                        </form>
                    </section>
                    {message && (
                        <div className="success-message">
                            {message}
                            {showProgressBar && <div className="progress-bar" />}
                        </div>
                    )}
                    {messageErr && (
                        <div className="err-message">
                            {messageErr}
                            {showProgressBar && <div className="progress-bar-err" />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditStaff2;
