
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useState } from "react";


import { useFormik } from "formik";
import * as Yup from "yup";
import "../../css/mngtForm.css";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddStaff = () => {
    //const [file, setFile] = useState("");


    //duy tri trang thai mat khau mac dinh
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [message, setMessage] = useState('');
    const [messageErr, setMessageErr] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        //fetchData();
        if (showProgressBar) {
            const timer = setTimeout(() => {
                setMessage('');
                setMessageErr('');
                setShowProgressBar(false);
            }, 2000); // Thời gian hiển thị thanh thời gian chạy: 3000ms
            return () => clearTimeout(timer);
        }
    }, [showProgressBar]);



    // const handleSubmit = () => {

    // }


    const formik = useFormik({
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",

            phone: "",
            password: "",
            confirmPassword: "",

        },
        validationSchema: Yup.object({
            email:
                Yup.string()
                    //.nullable() //không yêu cầu nhập
                    .required("Email không được bỏ trống.")
                    .matches(
                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        "Hãy nhập email đúng định dạng"
                    ),
            //     .required("Tên tài khoản không được bỏ trống.")
            //     .min(2, "Tên tài khoản phải có ít nhất 2 ký tự."),
            firstName: Yup.string()
                .required("Họ không được bỏ trống.")
                .min(2, "Họ phải có ít nhất 2 ký tự."),
            lastName: Yup.string()
                .required("Tên không được bỏ trống.")
                .min(2, "Tên phải có ít nhất 2 ký tự."),
            // email: Yup.string()
            //     .required("Email không được bỏ trống.")
            //     .matches(
            //         /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            //         "Hãy nhập email đúng định dạng"
            //     ),
            password: Yup.string()
                .required("Mật khẩu không được bỏ trống.")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,16}$/,
                    "Mật khẩu có 8 đến 16 ký tự, bao gồm ký tự thường, hoa, số và ký tự đặc biệt."
                ),

            phone: Yup.string()
                .required("Số điện thoại không được bỏ trống.")
                .matches(
                    /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    "Số điện thoại phải  hợp lệ (có 10 số)."
                ),
            confirmPassword: Yup.string()
                .required("Nhập lại mật khẩu")
                .oneOf([Yup.ref("password"), null], "Nhập lại mật khẩu sai"),
        }),
        onSubmit: async (values) => {
            //window.alert("Form submitted");
            //console.log(values);
            //event.preventDefault();
            // if (formik.isValid) {
            // const hasErrors = Object.keys(formik.errors).length !== 0;
            // if (!hasErrors) {

            // Thực hiện các hành động tiếp theo khi submit thành công
            // Gửi dữ liệu
            setShowProgressBar(true);

            try {
                // if (values.email) {
                const response = await axios.post('http://localhost:8080/api/account/addStaff/2', {
                    email: values.email,
                    firstname: values.firstName,
                    lastname: values.lastName,
                    phonenumber: values.phone,
                    password: values.password,
                });
                if (response.status === 201) {
                    if (response.data.id) {
                        setMessage('Tạo tài khoản nhân viên thành công!');
                        setTimeout(() => {

                            navigate('/admin/staffManagement');
                        }, 2000); // Hiển
                    } else {
                        setMessageErr('Số điện thoại và mật khẩu đã được sử dụng.');
                        //console.log(response.data.id)
                    }
                    //console.log('Tài khoản nhân viên đã được tạo thành công!');
                } else {
                    setMessageErr('Tạo tài khoản nhân viên thất bại!');
                }
                // } else {
                //     const response = await axios.post('http://localhost:8080/api/account/addStaff/2', {

                //         firstname: values.firstName,
                //         lastname: values.lastName,
                //         phonenumber: values.phone,
                //         password: values.password,
                //     });
                //     if (response.status === 201) {
                //         setMessage('Tạo tài khoản nhân viên thành công.');
                //         setTimeout(() => {

                //             navigate('/staffManagement');
                //         }, 2000); // Hiển
                //         //console.log('Tài khoản nhân viên đã được tạo thành công!');
                //     } else {
                //         setMessage('Tạo tài khoản nhân viên thất bại.');
                //     }
                // }

            } catch (error) {
                console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
                setMessageErr('Đã xảy ra lỗi khi gửi yêu cầu.');
            }


            // console.log('Submit successful!', values);
            // } else {
            //     setShowProgressBar(true);

            //     setMessageErr('Sai')
            //     // Nếu form không hợp lệ, hiển thị lỗi của từng trường input
            //     console.log('Submit failed! Please check for errors.');

            //     // Tạo một object mới để lưu trữ trạng thái touched của các trường input
            //     const newTouched = {};

            //     // Duyệt qua các trường input trong formik.errors
            //     Object.keys(formik.errors).forEach((fieldName) => {
            //         // Nếu trường input có lỗi, đánh dấu là đã touched
            //         if (formik.errors[fieldName]) {
            //             newTouched[fieldName] = true;
            //         }
            //     });

            //     // Cập nhật lại trạng thái touched của formik
            //     formik.setTouched(newTouched);
            // }



        },
    });
    // const [focusedField, setFocusedField] = useState(null);
    // const [errorsShown, setErrorsShown] = useState({});
    // const handleInputChange = (event) => {
    //     // Khi có sự kiện thay đổi trường input, kiểm tra lỗi và cập nhật trạng thái lỗi
    //     const fieldName = event.target.name;
    //     const fieldError = formik.errors[fieldName];
    //     setErrorsShown({
    //         ...errorsShown,
    //         [fieldName]: focusedField === fieldName && fieldError,
    //     });

    //     formik.handleChange(event);
    // };
    // const handleInputFocus = (fieldName) => {
    //     // Khi focus vào trường input, đánh dấu trường đang được focus
    //     setFocusedField(fieldName);
    // };

    // const handleInputBlur = () => {
    //     // Khi blur ra khỏi trường input, kiểm tra và hiển thị lỗi nếu có
    //     if (focusedField) {
    //         const fieldError = formik.errors[focusedField];
    //         setErrorsShown({
    //             ...errorsShown,
    //             [focusedField]: fieldError,
    //         });
    //     }
    //     // Reset trường đang được focus về null
    //     setFocusedField(null);
    // };
    const [errorsShown, setErrorsShown] = useState({});

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
                <Navbar title="Thêm nhân viên " />

                <Link to={`/admin/staffManagement`} className="arrow-back-icon" style={{ textDecoration: "none" }}>
                    <ArrowBackIcon />
                </Link>

                {/* <div className="title top">
                    <h1>Thêm nhân viên</h1>
                </div> */}
                <div className="bottom">
                    <div className="column2">


                        <div className="column">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="formInput">
                                    <label> Họ *</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        //onChange={formik.handleChange}
                                        onChange={handleInputChange}
                                        //onFocus={() => handleInputFocus('firstName')}
                                        //onBlur={handleInputBlur}
                                        onBlur={() => handleInputBlur('firstName')}
                                        placeholder="Nhập họ"
                                    />
                                    {/* C1: nhập vào trường input đầu thì bắt điều kiện tất cả các input còn lại
                            {formik.errors.firstName&& (
                                <p className="errorMsg"> {formik.errors.firstName} </p>
                            )} */}
                                    {/* C2: Nhấp vào button submit mới bắt lỗi
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <p className="errorMsg"> {formik.errors.firstName} </p>
                            ) : null} */}
                                    {/* {formik.touched.firstName && errorsShown.firstName ? (<p className="errorMsg">{errorsShown.firstName}</p>) : null} */}
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <p className="errorMsg"> {formik.errors.firstName} </p>

                                    ) : errorsShown.firstName && (<p className="errorMsg">{errorsShown.firstName}</p>)}
                                </div>
                                <div className="formInput">
                                    <label> Tên *</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={handleInputChange}
                                        onBlur={() => handleInputBlur('lastName')}
                                        placeholder="Nhập tên"
                                    />

                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <p className="errorMsg"> {formik.errors.lastName} </p>
                                    ) : errorsShown.lastName && <p className="errorMsg">{errorsShown.lastName}</p>}
                                </div>
                                <div className="formInput">
                                    <label> Email * </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={handleInputChange}
                                        onBlur={() => handleInputBlur('email')}
                                        placeholder="Nhập email"
                                    />

                                    {formik.touched.email && formik.errors.email ? (
                                        <p className="errorMsg"> {formik.errors.email} </p>
                                    ) : errorsShown.email && <p className="errorMsg">{errorsShown.email}</p>}
                                </div>
                                <div className="formInput">
                                    <label> Số điện thoại *</label>

                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={handleInputChange}
                                        onBlur={() => handleInputBlur('phone')}
                                        placeholder="Nhập số điện thoại"
                                    />

                                    {formik.touched.phone && formik.errors.phone ? (
                                        <p className="errorMsg"> {formik.errors.phone} </p>
                                    ) : errorsShown.phone && <p className="errorMsg">{errorsShown.phone}</p>}
                                </div>
                                <div className="formInput">
                                    <label> Mật khẩu *</label>
                                    <div className="pass">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={handleInputChange}
                                            //onFocus={() => handleInputFocus('password')}
                                            // onBlur={handleInputBlur}
                                            onBlur={() => handleInputBlur('password')}
                                            placeholder="Nhập mật khẩu"
                                        />

                                        <div className="icon" onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}

                                        </div>
                                    </div>


                                    {formik.touched.password && formik.errors.password ? (
                                        <p className="errorMsg"> {formik.errors.password} </p>
                                    ) : errorsShown.password && <p className="errorMsg">{errorsShown.password}</p>}
                                </div>
                                <div className="formInput">
                                    <label> Nhập lại mật khẩu *</label>
                                    <div className="pass">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formik.values.confirmPassword}
                                            onChange={handleInputChange}
                                            //onFocus={() => handleInputFocus('confirmPassword')}
                                            //onBlur={handleInputBlur}
                                            onBlur={() => handleInputBlur('confirmPassword')}
                                            placeholder="Nhập lại mật khẩu"
                                        />
                                        <div className="icon" onClick={() => {
                                            setShowConfirmPassword(!showConfirmPassword);
                                        }}>
                                            {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}

                                        </div>
                                    </div>

                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <p className="errorMsg"> {formik.errors.confirmPassword} </p>
                                    ) : errorsShown.confirmPassword && <p className="errorMsg">{errorsShown.confirmPassword}</p>}
                                </div>
                                {/* <label> Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Nhập email"
                            />
                            {formik.errors.email && (
                                <p className="errorMsg"> {formik.errors.email} </p>
                            )} */}
                                <button type="submit" > Tạo </button>
                                {/* onClick={handleSubmit} */}
                            </form>
                        </div>
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
        </div>

    );
};

export default AddStaff;
