import { useFormik } from "formik";
import * as Yup from "yup";
import "./loginForm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Đã check
const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);
    useEffect(() => {
        if (showProgressBar) {
            const timer = setTimeout(() => {
                setMessage('');
                setShowProgressBar(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [showProgressBar]);
    const formik = useFormik({
        initialValues: {
            phonenumber: "",
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Mật khẩu không được bỏ trống")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,16}$/,
                    "Mật khẩu có 8 đến 16 ký tự, bao gồm ký tự thường, hoa, số và ký tự đặc biệt."
                ),
            phonenumber: Yup.string()
                .required("Số điện thoại không được bỏ trống")
                .matches(
                    /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    "Số điện thoại phải  hợp lệ (có 10 số)."
                ),
        }),
        onSubmit: async (values) => {
            setShowProgressBar(true);
            try {
                const api = 'http://localhost:8080/api/login/'
                const response = await axios.post(api, values);
                const userData = response.data;
                console.log(userData);
                if (response.status === 200) {
                    if (userData.role.name === 'admin' && userData.account_status.status === 'active') {// Lưu trạng thái đăng nhập vào localStorage hoặc sessionStorage
                        setMessage('Đăng nhập tài khoản Admin thành công!');
                        localStorage.setItem('adminName', `${userData.firstname} ${userData.lastname}`);
                        localStorage.setItem('adminID', userData.id);
                        localStorage.setItem('isLoggedIn', true);
                        const isLoggedIn = localStorage.getItem('isLoggedIn');
                        if (isLoggedIn) {
                            setTimeout(() => {
                                navigate('/admin');
                            }, 1500);
                        }
                        console.log("admin");
                    } else if (userData.role.name === 'staff' && userData.account_status.status === 'active') {
                        setMessage('Đăng nhập tài khoản Staff thành công!');
                        localStorage.setItem('isLoggedIn', true);
                        setTimeout(() => {
                            navigate('/staff');
                        }, 1500);
                        console.log("staff");
                    } else if (userData.role.name === 'staff' && userData.account_status.status !== 'active') {
                        setMessage('Tài khoản đã bị khóa!');

                    }
                    else {
                        setMessage('Người dùng không có vai trò phù hợp');
                        console.error('Người dùng không có vai trò hoặc trạng thái phù hợp');
                    }
                }
                else {
                    setMessage('Số điện thoại hoặc mật khẩu không đúng');
                }
            }
            catch (error) {
                console.error("Error logging in:", error);
                setMessage('Số điện thoại hoặc mật khẩu không đúng');
            }

        },
    });

    return (
        <div>
            {message && (
                <div className="success-message">
                    {message}
                    {showProgressBar && <div className="progress-bar" />}
                </div>
            )}
            <section>

                <form className="infoform" onSubmit={formik.handleSubmit}>

                    <label> Số điện thoại </label>

                    <input
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        value={formik.values.phonenumber}
                        onChange={formik.handleChange}
                        placeholder="Nhập số điện thoại"
                    />
                    {formik.errors.phonenumber && (
                        <p className="errorMsg"> {formik.errors.phonenumber} </p>
                    )}

                    <label> Mật khẩu </label>
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
                    <button type="submit" > Đăng nhập </button>
                </form>
            </section>
        </div>
    );
};

export default LoginForm;
