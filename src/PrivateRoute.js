// // PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element, role, status, ...rest }) => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn'); // Kiểm tra trạng thái đăng nhập từ localStorage

//     if (!isLoggedIn || (role === 'admin' && status !== 'active')) {
//         return <Navigate to="/login" />; // Chuyển hướng đến trang login nếu không đăng nhập hoặc không phải là admin active
//     }

//     return <Route {...rest} element={element} />; // Trả về thành phần Route nếu đã đăng nhập và là admin active
// };

// export default PrivateRoute;


// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ element, ...rest }) => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');

//     if (isLoggedIn) {
//         return <Route {...rest} element={element} />;
//     } else {
//         return <Navigate to="/login" />;
//     }
// };

// export default PrivateRoute;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    return (
        <Routes>
            {isLoggedIn ? (
                <Route {...rest} element={element} />
            ) : (
                <Navigate to="/login" />
            )}
        </Routes>
    );
};

export default PrivateRoute;


