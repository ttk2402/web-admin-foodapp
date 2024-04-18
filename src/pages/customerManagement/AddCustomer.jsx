
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useState } from "react";


import { useFormik } from "formik";
import * as Yup from "yup";
import "../../css/mngtForm.css";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';

const AddCustomer = ({ title }) => {
    //const [file, setFile] = useState("");


    //duy tri trang thai mat khau mac dinh
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",

        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required("Họ không được bỏ trống.")
                .min(2, "Họ phải có ít nhất 2 ký tự."),
            lastName: Yup.string()
                .required("Tên không được bỏ trống.")
                .min(2, "Tên phải có ít nhất 2 ký tự."),
            email: Yup.string()
                .required("Email không được bỏ trống.")
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Hãy nhập email đúng định dạng"
                ),
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
        onSubmit: (values) => {
            //window.alert("Form submitted");
            console.log(values);

        },
    });

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="title top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    {/* <div className="left">

                    </div> */}


                    <section>
                        <form className="newUserForm" onSubmit={formik.handleSubmit}>
                            <label> Họ *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                placeholder="Nhập họ"
                            />
                            {formik.errors.firstName && (
                                <p className="errorMsg"> {formik.errors.firstName} </p>
                            )}
                            <label> Tên *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                placeholder="Nhập tên"
                            />
                            {formik.errors.lastName && (
                                <p className="errorMsg"> {formik.errors.lastName} </p>
                            )}

                            <label> Số điện thoại *</label>

                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                placeholder="Nhập số điện thoại"
                            />
                            {formik.errors.phone && (
                                <p className="errorMsg"> {formik.errors.phone} </p>
                            )}

                            <label> Mật khẩu *</label>
                            <div className="pass">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập mật khẩu"
                                />

                                <div className="icon" onClick={() => {
                                    setShowPassword(!showPassword);
                                }}>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}

                                </div>
                            </div>

                            {formik.errors.password && (
                                <p className="errorMsg"> {formik.errors.password} </p>
                            )}

                            <label> Nhập lại mật khẩu *</label>
                            <div className="pass">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập lại mật khẩu"
                                />
                                <div className="icon" onClick={() => {
                                    setShowConfirmPassword(!showConfirmPassword);
                                }}>
                                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}

                                </div>
                            </div>
                            {formik.errors.confirmPassword && (
                                <p className="errorMsg"> {formik.errors.confirmPassword} </p>
                            )}
                            <label> Email *</label>
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
                            )}
                            <button type="submit"> Tạo </button>
                        </form>
                    </section>


                </div>
            </div>
        </div>

    );
};

export default AddCustomer;
