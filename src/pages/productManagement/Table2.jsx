// //const response = await axios.get('http://localhost:8080/api/product/');

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Table2() {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/product/');
//                 setData(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             }
//         };

//         fetchData();

//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>Data Table</h1>
//             <ul>
//                 {data.map(item => (
//                     <li key={item.id}>
//                         <strong>ID:</strong> {item.id}, <strong>Name:</strong> {item.name}, <strong>Description:</strong> {item.description}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }


// export default Table2

//test tạo màn hình nổi
// import React, { useState } from 'react';
// import './vd/tabs.css'; // Import file CSS cho phong cách modal

// function Table2() {
//     const [showModal, setShowModal] = useState(false);

//     const openModal = () => {
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     return (
//         <div>
//             <button onClick={openModal}>Mở Modal</button>
//             {showModal && (
//                 <div className="modal-background" onClick={closeModal}>
//                     <div className="modal" onClick={(e) => e.stopPropagation()}>
//                         {/* <button className="close-button" onClick={closeModal}>Đóng</button> */}
//                         <span className="close" onClick={closeModal}>
//                             &times;
//                         </span>
//                         <div className="modal-content">
//                             <p>Nội dung của Modal ở đây</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


//test combobox
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Table2() {

//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/category/');
//             setCategories(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const handleSelectChange = (event) => {
//         setSelectedCategory(event.target.value);
//     };

//     return (
//         <div>
//             <h1>Category Dropdown</h1>
//             <select value={selectedCategory} onChange={handleSelectChange}>
//                 {/* <option value="">Select category...</option> */}
//                 {categories.map((category) => (
//                     <option key={category.id} value={category.title}>
//                         {category.title}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// }

//test xử lý thêm category
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './vd/messageSucc.css';

// function Table2() {
//     const [title, setTitle] = useState('');
//     const [url_image_category, setImg] = useState('');
//     const [message, setMessage] = useState('');
//     const [showProgressBar, setShowProgressBar] = useState(false);

//     useEffect(() => {
//         if (showProgressBar) {
//             const timer = setTimeout(() => {
//                 setMessage('');
//                 setShowProgressBar(false);
//             }, 3000); // Thời gian hiển thị thanh thời gian chạy: 3000ms
//             return () => clearTimeout(timer);
//         }
//     }, [showProgressBar]);

//     const handleTitleChange = (event) => {
//         setTitle(event.target.value);
//     };

//     const handleImgChange = (event) => {
//         setImg(event.target.value);

//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setShowProgressBar(true);
//         try {
//             const response = await axios.post('/api/category/add', { title, url_image_category });
//             setMessage('Category added successfully!');
//             setTitle('');
//             setImg('');
//             // // Tự động xóa thông báo sau 3 giây
//             // setTimeout(() => {
//             //     setMessage('');
//             // }, 3000);
//         } catch (error) {
//             console.error('Error adding category:', error);
//             setMessage('An error occurred while adding category.');
//         }
//     };

//     return (
//         <div>
//             <h1>Add Category</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Title:</label>
//                     <input type="text" value={title} onChange={handleTitleChange} required />
//                 </div>
//                 <div>
//                     <label>Image URL:</label>
//                     <input type="text" value={url_image_category} onChange={handleImgChange} required />
//                 </div>
//                 <button type="submit">Add Category</button>
//             </form>
//             {/* {message && <div className="success-message">{message}</div>} */}
//             {message && (
//                 <div className="success-message">
//                     {message}
//                     {showProgressBar && <div className="progress-bar" />}
//                 </div>
//             )}
//         </div>
//     );
//}

//test add product
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Table2 = () => {
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [name, setName] = useState('');
//     const [urlImage, setUrlImage] = useState('');
//     const [price, setPrice] = useState('');
//     const [description, setDescription] = useState('');
//     const [message, setMessage] = useState('');
//     const [showProgressBar, setShowProgressBar] = useState(false);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/category/');
//             setCategories(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const handleSelectChange = (event) => {
//         setSelectedCategory(event.target.value);
//     };

//     const handleNameChange = (event) => {
//         setName(event.target.value);
//     };

//     const handleUrlImageChange = (event) => {
//         setUrlImage(event.target.value);
//     };

//     const handlePriceChange = (event) => {
//         setPrice(event.target.value);
//     };

//     const handleDescriptionChange = (event) => {
//         setDescription(event.target.value);
//     };

//     const handleSubmit = async () => {
//         if (!selectedCategory || !name) {
//             setMessage('Vui lòng chọn danh mục và nhập tên món ăn.');
//             return;
//         }

//         setShowProgressBar(true); // Hiển thị thanh tiến trình khi bắt đầu submit

//         try {
//             const response = await axios.post(`http://localhost:8080/api/product/add/${selectedCategory}`, { name, url_image_product: urlImage, price, description });
//             if (response.status === 201) {
//                 setMessage('Tạo món ăn thành công!');
//                 setName('');
//                 setSelectedCategory('');
//                 setUrlImage('');
//                 setPrice('');
//                 setDescription('');
//             } else {
//                 setMessage('Tạo món ăn thất bại.');
//             }
//         } catch (error) {
//             console.error('Error adding product:', error);
//             setMessage('Có lỗi xảy ra khi tạo món ăn.');
//         } finally {
//             // Ẩn thanh tiến trình sau khi hoàn thành submit (có thể thay đổi thời gian dựa vào nhu cầu của bạn)
//             setTimeout(() => {
//                 setShowProgressBar(false);
//             }, 3000); // Thời gian hiển thị thanh tiến trình: 3000ms (3 giây)
//         }
//     };

//     return (
//         <div>
//             <h2>Tạo Món Ăn Mới</h2>
//             <div>
//                 <label htmlFor="category">Danh Mục:</label>
//                 <select id="category" value={selectedCategory} onChange={handleSelectChange}>
//                     <option value="">Chọn danh mục</option>
//                     {categories.map((category) => (
//                         <option key={category.id} value={category.id}>{category.title}</option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <label htmlFor="name">Tên Món Ăn:</label>
//                 <input id="name" type="text" value={name} onChange={handleNameChange} />
//             </div>
//             <div>
//                 <label htmlFor="urlImage">Link Ảnh Món Ăn:</label>
//                 <input id="urlImage" type="text" value={urlImage} onChange={handleUrlImageChange} />
//             </div>
//             <div>
//                 <label htmlFor="price">Giá:</label>
//                 <input id="price" type="text" value={price} onChange={handlePriceChange} />
//             </div>
//             <div>
//                 <label htmlFor="description">Mô Tả:</label>
//                 <textarea id="description" value={description} onChange={handleDescriptionChange} />
//             </div>
//             <button onClick={handleSubmit}>Tạo Món Ăn</button>
//             {showProgressBar && <div className="progress-bar">Đang xử lý...</div>}
//             {message && <p>{message}</p>}
//         </div>
//     );
// };


//trang tạo đơn hàng nv
// import React, { useState } from 'react';
// import './vd/tabs.css'
// const Table2 = () => {
//     // Danh sách sản phẩm
//     const products = [
//         { id: 1, name: 'Product A', price: 10 },
//         { id: 2, name: 'Product B', price: 20 },
//         { id: 3, name: 'Product C', price: 30 }
//     ];

//     // Trạng thái đơn hàng
//     const [orderItems, setOrderItems] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);

//     // Hàm thêm sản phẩm vào đơn hàng
//     const addProductToOrder = (product) => {
//         setOrderItems([...orderItems, product]);
//         setTotalPrice(totalPrice + product.price);
//     };

//     // Hàm xuất hóa đơn
//     const printInvoice = () => {
//         // Xử lý xuất hóa đơn ở đây (ví dụ: alert)
//         alert(`Invoice: Total price is ${totalPrice}`);
//     };

//     return (
//         <div>
//             <h1>Create Order</h1>
//             <div>
//                 <h2>Products</h2>
//                 <ul>
//                     {products.map((product) => (
//                         <li key={product.id}>
//                             {product.name} - ${product.price}
//                             <button onClick={() => addProductToOrder(product)}>Add to Order</button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div>
//                 <h2>Order</h2>
//                 <ul>
//                     {orderItems.map((item, index) => (
//                         <li key={index}>{item.name} - ${item.price}</li>
//                     ))}
//                 </ul>
//                 <p>Total: ${totalPrice}</p>
//                 <button onClick={printInvoice}>Print Invoice</button>
//             </div>
//         </div>
//     );
// };



//trang ql nv
//import "../../css/mngtTableHome.css";
// import './vd/tabs.css'
// import { DataGrid } from '@mui/x-data-grid';
// //import { Link } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Table2 = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState(''); // Sử dụng state message thay vì notification
//     const [showProgressBar, setShowProgressBar] = useState(false);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/account/2');
//             setData(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         if (showProgressBar) {
//             const timer = setTimeout(() => {
//                 setMessage('');
//                 setShowProgressBar(false);
//             }, 2000);
//             return () => clearTimeout(timer);
//         }
//     }, [showProgressBar]);

//     const handleLockUnlock = async (params) => {
//         const accountId = params.row.id;
//         const currentStatus = params.row.account_status?.status;

//         try {
//             if (currentStatus === 'Active') {
//                 await axios.put(`http://localhost:8080/api/account/block/${accountId}`);
//                 setMessage('Tài khoản đã được khóa thành công.'); // Hiển thị thông báo khi khóa thành công
//             } else if (currentStatus === 'Block') {
//                 await axios.put(`http://localhost:8080/api/account/open/${accountId}`);
//                 setMessage('Tài khoản đã được mở thành công.'); // Hiển thị thông báo khi mở thành công
//             }
//             fetchData();
//         } catch (error) {
//             console.error('Error updating account status:', error);
//         }
//     };

//     const columns = [
//         // Các cột dữ liệu
//     ];

//     const actionColumn = [
//         // Các cột hành động
//     ];

//     const handleDelete = (id) => {
//         setData(data.filter((item) => item.id !== id));
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     const sortModel = [{ field: 'id', sort: 'desc' }];

//     return (
//         <div className="datatable">
//             {message && (
//                 <div className="success-message">
//                     {message}
//                 </div>
//             )}
//             <DataGrid
//                 className="datagrid"
//                 rows={data}
//                 columns={columns.concat(actionColumn)}
//                 initialState={{
//                     pagination: {
//                         paginationModel: { page: 0, pageSize: 9 },
//                     },
//                 }}
//                 pageSizeOptions={[9]}
//                 checkboxSelection
//                 sortModel={sortModel}
//             />
//         </div>
//     );
// }
import './vd/tabs.css'
// import React, { useState } from "react";

// import CheckIcon from "@mui/icons-material/Check";

// const Table2 = () => {
//     const steps = ["Customer Info", "Shipping Info", "Payment", "Step 4", "Step 5"];
//     const [currentStep, setCurrentStep] = useState(1);
//     const [complete, setComplete] = useState(false);
//     const [cancelled, setCancelled] = useState(false);
//     const [isWaitingConfirmation, setIsWaitingConfirmation] = useState(true);

//     const handleUpdateStatus = () => {
//         console.log("Cập nhật trạng thái");
//         setCurrentStep((prev) => prev + 1);
//         if (currentStep === 1) {
//             setIsWaitingConfirmation(false); // Chuyển sang bước tiếp theo, không còn ở bước chờ xác nhận
//         }
//         if (currentStep === steps.length - 1) {
//             setComplete(true); // Hoàn thành tất cả các bước
//         }
//     };

//     const handleCancel = () => {
//         console.log("Hủy đơn hàng");
//         setCancelled(true);
//         setCurrentStep(steps.length + 1); // Chuyển sang bước cuối cùng khi hủy
//     };

//     return (
//         <>
//             <div className="flex justify-between">
//                 {steps?.map((step, i) => (
//                     <div
//                         key={i}
//                         className={`step-item ${currentStep === i + 1 && "active"
//                             } ${i + 1 < currentStep || complete ? "complete" : ""} ${cancelled && i + 1 < steps.length && "cancel" // Thêm lớp 'cancel' khi bị hủy
//                             }`}
//                     >
//                         <div className="step">

//                             {i + 1 < currentStep || complete ? (
//                                 <CheckIcon size={24} />
//                             ) : (
//                                 i + 1
//                             )}
//                         </div>
//                         <p className="text-gray-500">{step}</p>
//                     </div>
//                 ))}
//             </div>

//             {!complete && (
//                 <button
//                     className={`btn ${cancelled && "hide"}`}
//                     onClick={handleUpdateStatus}
//                 >
//                     {currentStep === steps.length ? "Finish" : "Next"}
//                 </button>
//             )}

//             {!complete && (
//                 <button
//                     className={`btn ${!isWaitingConfirmation && "hide"}`} // Ẩn nút khi không còn ở bước chờ xác nhận
//                     onClick={handleCancel}
//                 >
//                     Hủy
//                 </button>
//             )}
//         </>
//     );
// };


import React, { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

const Table2 = () => {
    const steps = [
        { label: 'Chờ xác nhận', icon: <CheckIcon /> },
        { label: 'Chờ lấy hàng', icon: '🚚' },
        { label: 'Đang đến', icon: '📦' },
        { label: 'Đã giao', icon: '🎉' },
        { label: 'Hủy', icon: <CancelIcon /> },
    ];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const handleUpdateStatus = () => {
        console.log('Cập nhật trạng thái');
        setCurrentStep(prevStep => prevStep + 1);
        if (currentStep === steps.length - 1) {
            setComplete(true);
        }
    };

    const handleCancel = () => {
        console.log('Hủy');
        setCancelled(true);
    };

    return (
        <>
            <div className="flex justify-between">
                {steps?.map((step, i) => (
                    <div
                        key={i}
                        className={`step-item ${currentStep === i + 1 && "active"} ${i + 1 < currentStep || complete ? "complete" : ""} ${cancelled && i + 1 <= steps.length && "cancel"}`}
                    >
                        <div className="step">
                            {i + 1 < currentStep || complete ? (
                                step.icon
                            ) : (
                                i + 1
                            )}
                        </div>
                        <span className="step-label">{step.label}</span>
                    </div>
                ))}
            </div>
            {!complete && (
                <button
                    className={`btn ${cancelled && "hide"}`}
                    onClick={() => {
                        handleUpdateStatus();
                        setCurrentStep(prevStep => prevStep + 1);
                        setCancelled(false);
                    }}
                >
                    {currentStep === steps.length ? "Finish" : "Next"}
                </button>
            )}
            <button
                className={`btn ${!cancelled && currentStep === 1 && "hide"}`}
                onClick={() => {
                    handleCancel();
                    setCurrentStep(steps.length);
                    setComplete(true);
                }}
                disabled={cancelled}
            >
                Hủy
            </button>
        </>
    );
};




export default Table2