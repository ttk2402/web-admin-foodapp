import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";

// import CustomerDetail from "./pages/customerManagement/CustomerDetail";

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import ChangePassword from "./pages/changePassword/ChangePassword";
// import CustomerMngtHome from "./pages/customerManagement/CustomerMngtHome";

// import StaffMngHome from "./pages/staffManagement/StaffMngtHome";
// import StaffDetail from "./pages/staffManagement/StaffDetail";
// import AddStaff from "./pages/staffManagement/AddStaff";
// import EditStaff from "./pages/staffManagement/EditStaff";
// import DiscountMngtHome from "./pages/discountManagement/DiscountMngtHome";
// import DiscountDetail from "./pages/discountManagement/DiscountDetail";
// //import AddCustomer from "./pages/customerManagement/AddCustomer";
// //import EditCustomer from "./pages/customerManagement/EditCustomer";
// import AddDiscount from "./pages/discountManagement/AddDiscount";
// import EditDiscount from "./pages/discountManagement/EditDiscount";
// import ProductMngtHome from "./pages/productManagement/ProductMngtHome";
// import ProductDetail from "./pages/productManagement/ProductDetail";
// import AddProduct from "./pages/productManagement/AddProduct";
// import EditProduct from "./pages/productManagement/EditProduct";
// import OrderMngtHome from "./pages/orderManagement/OrderMngtHome";
// import OrderDetail from "./pages/orderManagement/OrderDetail";
// import EditOrder from "./pages/orderManagement/EditOrder";
// import Table2 from "./pages/productManagement/Table2";
// import AddCategory from "./pages/productManagement/AddCategory";
// import EditCategory from "./pages/productManagement/EditCategory";
// import PrivateRoute from "./PrivateRoute.JS";
// //import EditStaff2 from "./pages/staffManagement/EditStaff2";



// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>

//           <Route path="/login" element={<Login />} />
//           <Route path="/admin" >

//             {/* // <Route path="/"> */}

//             <Route index element={<Home />} />
//             {/* <Route path="login" element={<Login />} /> */}

//             <Route path="staffManagement">
//               <Route index element={<StaffMngHome />} />
//               <Route path="staffDetail/:staffId" element={<StaffDetail />} />

//               <Route path="addStaff" element={<AddStaff />} />
//               <Route path="editStaff/:staffId" element={<EditStaff />} />
//               {/* <Route path="editStaff2/:staffId" element={<EditStaff2 />} /> */}
//             </Route>

//             <Route path="discountManagement">
//               <Route index element={<DiscountMngtHome />} />
//               <Route path="discountDetail/:discountCode" element={<DiscountDetail />} />

//               <Route path="addDiscount" element={<AddDiscount title="Thêm khuyến mãi" />} />
//               <Route path="editDiscount" element={<EditDiscount title="Chỉnh sửa thông tin khuyến mãi" />} />
//             </Route>

//             <Route path="customerManagement" >
//               <Route index element={<CustomerMngtHome />} />
//               <Route path="customerDetail/:customerId" element={<CustomerDetail />} />

//               {/* <Route path="addCustomer" element={<AddCustomer title="Thêm khách hàng" />} /> */}
//               {/* <Route path="editCustomer" element={<EditCustomer title="Chỉnh sửa thông tin khách hàng" />} /> */}
//             </Route>

//             <Route path="productManagement">
//               {/* <Route index element={<User />} /> */}
//               <Route index element={<ProductMngtHome />} />
//               <Route path="productDetail/:productId" element={<ProductDetail />} />
//               <Route path="addProduct" element={<AddProduct />} />
//               {/* title="Thêm món ăn"  */}
//               <Route path="addCategory" element={<AddCategory />} />
//               <Route path="editProduct/:productId" element={<EditProduct />} />
//               <Route path="editCategory/:categoryId" element={<EditCategory />} />
//             </Route>

//             <Route path="orderManagement">
//               <Route index element={<OrderMngtHome />} />
//               <Route path="orderDetail/:orderId" element={<OrderDetail />} />

//               {/* <Route path="addDiscount" element={<AddDiscount title="Thêm khuyến mãi" />} /> */}
//               <Route path="editOrder" element={<EditOrder title="Chỉnh sửa đơn hàng" />} />
//             </Route>

//             <Route path="setting">
//               <Route path="changePassword" element={<ChangePassword title="Thay đổi mật khẩu" />} />
//             </Route>

//             <Route path="table2">
//               <Route index element={<Table2 />} />
//             </Route>
//           </Route>
//           {/* </Route> */}
//           {/* <Redirect to="/login" /> */}
//           <Route path="*" element={<Navigate to="/login" />} />
//           <Route path="/staff" element={<Table2 />} />

//         </Routes>
//       </BrowserRouter>
//     </div >
//   );
// }

// export default App;



// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './useAuth'; // import hook useAuth để kiểm tra đăng nhập

// const PrivateRoute = ({ element, ...rest }) => {
//     const { user } = useAuth(); // Lấy thông tin người dùng từ hook useAuth

//     // Kiểm tra xem người dùng đã đăng nhập chưa, nếu chưa thì chuyển hướng về trang login
//     return user ? (
//         <Route {...rest} element={element} />
//     ) : (
//         <Navigate to="/login" />
//     );
// };

// export default PrivateRoute;
