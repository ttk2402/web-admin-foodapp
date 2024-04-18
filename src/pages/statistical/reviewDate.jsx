// import "../../css/mngtDetail.css";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// // import Chart from "../../../components/chart/Chart";


// import { Link, useLocation } from "react-router-dom";

// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import DeleteIcon from '@mui/icons-material/Delete';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Star from "../../components/img/ReviewStar.PNG"



// const ReviewDate = ({ startDate, endDate, reviews, stats }) => {



//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const [reviews, setReviews] = useState({ reviews });
//     const [visibleReviews, setVisibleReviews] = useState(5); // Số lượng đánh giá hiển thị ban đầu
//     const [amountReview, setAmountReview] = useState(0);
//     //const [stats, setStats] = useState({});
//     const [selectedStar, setSelectedStar] = useState(null); //loc danh gia theo so sao
//     const [textStar, setTextStar] = useState('Tất cả đánh giá');

//     const [message, setMessage] = useState('');
//     const [showProgressBar, setShowProgressBar] = useState(false);


//     const calculateStats = reviews => {
//         const totalReviews = reviews.length;
//         const totalStars = reviews.reduce((acc, review) => acc + review.numberofstar, 0);
//         const averageStars = totalStars / totalReviews || 0;

//         // Tính số lượng đánh giá cho mỗi số sao
//         const starsCount = {};
//         for (let i = 1; i <= 5; i++) {
//             const count = reviews.filter(review => review.numberofstar === i).length;
//             starsCount[i] = count;
//         }

//         return {
//             totalReviews,
//             averageStars,
//             starsCount
//         };
//     };

//     useEffect(() => {
//         // // Assume fetchData là hàm để lấy dữ liệu sản phẩm từ một nguồn dữ liệu nào đó
//         // const fetchData = async () => {
//         //     try {
//         //         // Thực hiện lấy dữ liệu sản phẩm dựa trên productId
//         //         //const response = await fetch(`api/product/${productId}`);
//         //         const response = await axios.get(`http://localhost:8080/api/product/${productId}`);

//         //         if (response.status === 200) {
//         //             const contentType = response.headers['content-type'];
//         //             if (contentType && contentType.includes('application/json')) {
//         //                 setProduct(response.data);
//         //             } else {
//         //                 throw new Error('Invalid content type');
//         //             }
//         //         } else {
//         //             throw new Error('Network response was not ok');
//         //         }
//         //         setLoading(false);
//         //     } catch (error) {
//         //         console.error('Error fetching product data:', error);
//         //         setError('Error fetching product data. Please try again later.');
//         //         setLoading(false);
//         //     }
//         // };

//         // fetchData();
//         // const fetchReviews = async () => {
//         //     try {
//         //         const response = await axios.get(`http://localhost:8080/api/review/product/${productId}`);
//         //         // setReviews(response.data);
//         //         setAmountReview(response.data.length); // Đếm số lượng từ dữ liệu nhận được
//         //         const sortedReviews = response.data.sort((a, b) => b.id - a.id); // Sắp xếp đánh giá theo id giảm dần
//         //         setReviews(sortedReviews);
//         //         const stats = calculateStats(sortedReviews);
//         //         setStats(stats);
//         //     } catch (error) {
//         //         console.error('Error fetching reviews:', error);
//         //     }

//         // };

//         // fetchReviews();
//         if (showProgressBar) {
//             const timer = setTimeout(() => {
//                 setMessage('');
//                 setShowProgressBar(false);
//             }, 2000); // Thời gian hiển thị thanh thời gian chạy: 3000ms
//             return () => clearTimeout(timer);
//         }
//         // Không cần cleanup effect ở đây vì chúng ta không có sử dụng subscriptions hoặc timers
//     }, [showProgressBar]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }



//     const handleDeleteReview = async (reviewId) => {
//         setShowProgressBar(true);
//         try {
//             const response = await axios.delete(`http://localhost:8080/api/review/${reviewId}`);
//             if (response.status === 200) {
//                 setMessage('Xóa đánh giá thành công!');
//                 setReviews(reviews.filter(review => review.id !== reviewId));
//             } else {
//                 setMessage('Xóa đánh giá thất bại.');
//             }
//         } catch (error) {
//             console.error('Error deleting review:', error);
//             setMessage('Lỗi!');
//         }
//     };
//     const handleShowMoreReviews = () => {
//         setVisibleReviews(visibleReviews + 5); // Hiển thị thêm 5 đánh giá khi nhấn nút "Xem thêm"
//     };


//     const handleStarClick = (star) => {
//         setSelectedStar(star);
//         setVisibleReviews(5); // Reset số lượng đánh giá hiển thị khi chọn số sao
//         setTextStar(`Các đánh giá ${star} sao`);
//     };
//     // Lọc đánh giá theo số sao
//     const filteredReviews = selectedStar ? reviews.filter(review => review.numberofstar === selectedStar) : reviews;

//     return (
//         <div className="single">
//             <Sidebar />
//             <div className="singleContainer">
//                 <Navbar />
//                 <Link to={`/admin/productManagement`} className="arrow-back-icon" style={{ textDecoration: "none" }}>
//                     <ArrowBackIcon />

//                 </Link>
//                 <div className="top">

//                 </div>
//                 <div className="bottom">
//                     {message && (
//                         <div className="success-message">
//                             {message}
//                             {showProgressBar && <div className="progress-bar" />}
//                         </div>
//                     )}
//                     <h1 className="title">Đánh giá ()</h1>
//                     <p>từ ngày {startDate} đến ngày {endDate}</p>
//                     {stats.totalReviews > 0 && (
//                         <div className="stats-titleDetail">
//                             <p>số đánh giá: {stats.totalReviews}</p>
//                             <p>Số sao trung bình: {stats.averageStars.toFixed(1)}</p>
//                             {stats && stats.starsCount && (
//                                 <div className="star-container">

//                                     {Object.entries(stats.starsCount).map(([star, count]) => (

//                                         <div
//                                             key={star}
//                                             className="star-countDetail"
//                                             onClick={() => handleStarClick(parseInt(star))}

//                                         >
//                                             <p>{star} sao:</p>
//                                             <p>({count})</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     )}


//                     {/* {reviews.map((review, index) => ( */}
//                     {/* {reviews.slice(0, visibleReviews).map((review, index) => ( */}
//                     <p className="textStar">{textStar}</p>
//                     {filteredReviews.slice(0, visibleReviews).map((review, index) => (
//                         <div className="detailsReview" key={review.id}>

//                             <h1 className="itemTitleCmt">{review.account.firstname} {review.account.lastname}</h1>
//                             <div className="itemReview">
//                                 <div className="detailItemReview">
//                                     {/* <span className="itemKey">Số sao:</span> */}
//                                     <span className="starRating">
//                                         {[...Array(review.numberofstar)].map((star, index) => (
//                                             <img src={Star} alt="star" key={index} />
//                                         ))}
//                                     </span>
//                                     {/* <span className="itemValue">{review.numberofstar}</span> */}
//                                 </div>
//                                 <div className="detailItemReview">
//                                     {/* <span className="itemKey">Ngày đánh giá:</span> */}
//                                     <span className="itemValueDate">{review.datereview}</span>
//                                 </div>
//                                 <div className="detailItemReview ">
//                                     {/* <span className="itemKey">Đánh giá:</span> */}
//                                     <span className="itemValueContent">{review.content} </span>
//                                 </div>
//                                 {/* <div className="detailItemReview">
//                                     <button className="deleteButton" onClick={() => handleDeleteReview(review.id)}>
//                                         <DeleteIcon />
//                                     </button>
//                                 </div> */}
//                                 <div
//                                     className="deleteButtonReview"
//                                     onClick={() => handleDeleteReview(review.id)}
//                                 >
//                                     <DeleteIcon />
//                                 </div>
//                             </div>
//                             {index !== filteredReviews.length - 1 && <hr className="separator" />} {/* Gạch ngang phân cách */}
//                         </div>
//                     ))}
//                     {visibleReviews < filteredReviews.length && (
//                         <div className="showMoreButton" onClick={handleShowMoreReviews}>Xem thêm</div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ReviewDate;

// const ReviewDate = ({ startDate, endDate, reviews, stats }) => {

//     const [loading, setLoading] = useState(true);
//     const [visibleReviews, setVisibleReviews] = useState(5);
//     const [selectedStar, setSelectedStar] = useState(null);
//     const [message, setMessage] = useState('');
//     const [showProgressBar, setShowProgressBar] = useState(false);

//     useEffect(() => {
//         setLoading(false);
//     }, []);

//     const handleDeleteReview = async (reviewId) => {
//         setShowProgressBar(true);
//         try {
//             const response = await axios.delete(`http://localhost:8080/api/review/${reviewId}`);
//             if (response.status === 200) {
//                 setMessage('Xóa đánh giá thành công!');
//                 // Cập nhật lại danh sách đánh giá sau khi xóa
//                 // Không biết cấu trúc dữ liệu của reviews, nên chỉ mô phỏng
//                 // setReviews(reviews.filter(review => review.id !== reviewId));
//             } else {
//                 setMessage('Xóa đánh giá thất bại.');
//             }
//         } catch (error) {
//             console.error('Error deleting review:', error);
//             setMessage('Lỗi!');
//         }
//     };

//     const handleShowMoreReviews = () => {
//         setVisibleReviews(visibleReviews + 5);
//     };

//     const handleStarClick = (star) => {
//         setSelectedStar(star);
//         setVisibleReviews(5);
//     };

//     //const filteredReviews = selectedStar ? reviews.filter(review => review.numberofstar === selectedStar) : reviews;
//     const filteredReviews = selectedStar ? reviews.filter(review => review.numberofstar === selectedStar) : reviews;
//     return (
//         <div className="single">
//             <Link to={`/admin/productManagement`} className="arrow-back-icon" style={{ textDecoration: "none" }}>
//                 <ArrowBackIcon />
//             </Link>
//             <div className="top"></div>
//             <div className="bottom">
//                 {message && (
//                     <div className="success-message">
//                         {message}
//                         {showProgressBar && <div className="progress-bar" />}
//                     </div>
//                 )}
//                 <h1 className="title">Đánh giá ()</h1>
//                 <p>từ ngày {startDate} đến ngày {endDate}</p>
//                 {stats && stats.totalReviews > 0 && (
//                     <div className="stats-titleDetail">
//                         <p>số đánh giá: {stats.totalReviews}</p>
//                         <p>Số sao trung bình: {stats.averageStars.toFixed(1)}</p>
//                         {stats && stats.starsCount && (
//                             <div className="star-container">
//                                 {Object.entries(stats.starsCount).map(([star, count]) => (
//                                     <div
//                                         key={star}
//                                         className="star-countDetail"
//                                         onClick={() => handleStarClick(parseInt(star))}
//                                     >
//                                         <p>{star} sao:</p>
//                                         <p>({count})</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 )}
//                 <p className="textStar">Tất cả đánh giá</p>

//                 {filteredReviews.slice(0, visibleReviews).map((review, index) => (
//                     <div className="detailsReview" key={review.id}>
//                         <h1 className="itemTitleCmt">{review.account.firstname} {review.account.lastname}</h1>
//                         <div className="itemReview">
//                             <div className="detailItemReview">
//                                 <span className="starRating">
//                                     {[...Array(review.numberofstar)].map((star, index) => (
//                                         <img src={Star} alt="star" key={index} />
//                                     ))}
//                                 </span>
//                             </div>
//                             <div className="detailItemReview">
//                                 <span className="itemValueDate">{review.datereview}</span>
//                             </div>
//                             <div className="detailItemReview">
//                                 <span className="itemValueContent">{review.content}</span>
//                             </div>
//                             <div className="deleteButtonReview" onClick={() => handleDeleteReview(review.id)}>
//                                 <DeleteIcon />
//                             </div>
//                         </div>
//                         {index !== filteredReviews.length - 1 && <hr className="separator" />}
//                     </div>
//                 ))}
//                 {visibleReviews < filteredReviews.length && (
//                     <div className="showMoreButton" onClick={handleShowMoreReviews}>Xem thêm</div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ReviewDate;



// const ReviewDate = () => {
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [visibleReviews, setVisibleReviews] = useState(5);
//     const [message, setMessage] = useState('');
//     const [showProgressBar, setShowProgressBar] = useState(false);
//     const [selectedStar, setSelectedStar] = useState(null);
//     const [textStar, setTextStar] = useState('Tất cả đánh giá');
//     const { startDate, endDate, reviews, stats } = this.props.first.location.state;

//     useEffect(() => {
//         setLoading(false); // Tạm thời vô hiệu hóa loading để hiển thị nội dung
//         console.log('start', startDate);
//         console.log('end', endDate);
//         console.log('stats', stats);
//         console.log('review', reviews)
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     const calculateStats = reviews => {
//         const totalReviews = reviews.length;
//         const totalStars = reviews.reduce((acc, review) => acc + review.numberofstar, 0);
//         const averageStars = totalStars / totalReviews || 0;
//         const starsCount = {};
//         for (let i = 1; i <= 5; i++) {
//             const count = reviews.filter(review => review.numberofstar === i).length;
//             starsCount[i] = count;
//         }
//         return {
//             totalReviews,
//             averageStars,
//             starsCount
//         };
//     };

//     const handleDeleteReview = async (reviewId) => {
//         setShowProgressBar(true);
//         try {
//             const response = await axios.delete(`http://localhost:8080/api/review/${reviewId}`);
//             if (response.status === 200) {
//                 setMessage('Xóa đánh giá thành công!');
//                 // setReviews(reviews.filter(review => review.id !== reviewId));
//             } else {
//                 setMessage('Xóa đánh giá thất bại.');
//             }
//         } catch (error) {
//             console.error('Error deleting review:', error);
//             setMessage('Lỗi!');
//         }
//     };

//     const handleShowMoreReviews = () => {
//         setVisibleReviews(visibleReviews + 5);
//     };

//     const handleStarClick = (star) => {
//         setSelectedStar(star);
//         setVisibleReviews(5);
//         setTextStar(`Các đánh giá ${star} sao`);
//     };

//     const filteredReviews = selectedStar ? reviews.filter(review => review.numberofstar === selectedStar) : reviews;

//     return (
//         <div className="single">
//             <Sidebar />
//             <div className="singleContainer">
//                 <Navbar />
//                 <Link to={`/admin/productManagement`} className="arrow-back-icon" style={{ textDecoration: "none" }}>
//                     <ArrowBackIcon />
//                 </Link>
//                 <div className="top"></div>
//                 <div className="bottom">
//                     {message && (
//                         <div className="success-message">
//                             {message}
//                             {showProgressBar && <div className="progress-bar" />}
//                         </div>
//                     )}
//                     <h1 className="title">Đánh giá ()</h1>
//                     <p>từ ngày {startDate} đến ngày {endDate}</p>
//                     {stats.totalReviews > 0 && (
//                         <div className="stats-titleDetail">
//                             <p>số đánh giá: {stats.totalReviews}</p>
//                             <p>Số sao trung bình: {stats.averageStars.toFixed(1)}</p>
//                             {stats && stats.starsCount && (
//                                 <div className="star-container">
//                                     {Object.entries(stats.starsCount).map(([star, count]) => (
//                                         <div
//                                             key={star}
//                                             className="star-countDetail"
//                                             onClick={() => handleStarClick(parseInt(star))}
//                                         >
//                                             <p>{star} sao:</p>
//                                             <p>({count})</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                     <p className="textStar">{textStar}</p>
//                     {filteredReviews.slice(0, visibleReviews).map((review, index) => (
//                         <div className="detailsReview" key={review.id}>
//                             <h1 className="itemTitleCmt">{review.account.firstname} {review.account.lastname}</h1>
//                             <div className="itemReview">
//                                 <div className="detailItemReview">
//                                     <span className="starRating">
//                                         {[...Array(review.numberofstar)].map((star, index) => (
//                                             <img src={Star} alt="star" key={index} />
//                                         ))}
//                                     </span>
//                                 </div>
//                                 <div className="detailItemReview">
//                                     <span className="itemValueDate">{review.datereview}</span>
//                                 </div>
//                                 <div className="detailItemReview">
//                                     <span className="itemValueContent">{review.content} </span>
//                                 </div>
//                                 <div className="deleteButtonReview" onClick={() => handleDeleteReview(review.id)}>
//                                     <DeleteIcon />
//                                 </div>
//                             </div>
//                             {index !== filteredReviews.length - 1 && <hr className="separator" />}
//                         </div>
//                     ))}
//                     {visibleReviews < filteredReviews.length && (
//                         <div className="showMoreButton" onClick={handleShowMoreReviews}>Xem thêm</div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ReviewDate;




// const ReviewDate = () => {
//     const location = useLocation();

//     const { startDate, endDate, reviews, stats } = location.state;

//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [visibleReviews, setVisibleReviews] = useState(5);
//     const [message, setMessage] = useState('');
//     const [showProgressBar, setShowProgressBar] = useState(false);
//     const [selectedStar, setSelectedStar] = useState(null);
//     const [textStar, setTextStar] = useState('Tất cả đánh giá');

//     useEffect(() => {
//         setLoading(false); // Tạm thời vô hiệu hóa loading để hiển thị nội dung
//         console.log('start', startDate);
//         console.log('end', endDate);
//         console.log('stats', stats);
//         console.log('review', reviews);
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     const calculateStats = reviews => {
//         const totalReviews = reviews.length;
//         const totalStars = reviews.reduce((acc, review) => acc + review.numberofstar, 0);
//         const averageStars = totalStars / totalReviews || 0;
//         const starsCount = {};
//         for (let i = 1; i <= 5; i++) {
//             const count = reviews.filter(review => review.numberofstar === i).length;
//             starsCount[i] = count;
//         }
//         return {
//             totalReviews,
//             averageStars,
//             starsCount
//         };
//     };

//     const handleDeleteReview = async (reviewId) => {
//         setShowProgressBar(true);
//         try {
//             const response = await axios.delete(`http://localhost:8080/api/review/${reviewId}`);
//             if (response.status === 200) {
//                 setMessage('Xóa đánh giá thành công!');
//                 // setReviews(reviews.filter(review => review.id !== reviewId));
//             } else {
//                 setMessage('Xóa đánh giá thất bại.');
//             }
//         } catch (error) {
//             console.error('Error deleting review:', error);
//             setMessage('Lỗi!');
//         }
//     };

//     const handleShowMoreReviews = () => {
//         setVisibleReviews(visibleReviews + 5);
//     };

//     const handleStarClick = (star) => {
//         setSelectedStar(star);
//         setVisibleReviews(5);
//         setTextStar(`Các đánh giá ${star} sao`);
//     };

//     const filteredReviews = selectedStar ? reviews.filter(review => review.numberofstar === selectedStar) : reviews;


//     return (
//         <div className="single">
//             <Sidebar />
//             <div className="singleContainer">
//                 <Navbar />
//                 <Link to={`/admin/productManagement`} className="arrow-back-icon" style={{ textDecoration: "none" }}>
//                     <ArrowBackIcon />
//                 </Link>
//                 <div className="top"></div>
//                 <div className="bottom">
//                     {message && (
//                         <div className="success-message">
//                             {message}
//                             {showProgressBar && <div className="progress-bar" />}
//                         </div>
//                     )}
//                     <h1 className="title">Đánh giá ()</h1>
//                     <p>từ ngày {startDate} đến ngày {endDate}</p>
//                     {stats.totalReviews > 0 && (
//                         <div className="stats-titleDetail">
//                             <p>số đánh giá: {stats.totalReviews}</p>
//                             <p>Số sao trung bình: {stats.averageStars.toFixed(1)}</p>
//                             {stats && stats.starsCount && (
//                                 <div className="star-container">
//                                     {Object.entries(stats.starsCount).map(([star, count]) => (
//                                         <div
//                                             key={star}
//                                             className="star-countDetail"
//                                             onClick={() => handleStarClick(parseInt(star))}
//                                         >
//                                             <p>{star} sao:</p>
//                                             <p>({count})</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                     <p className="textStar">{textStar}</p>
//                     {/* Các phần còn lại của component */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ReviewDate;

// import React from 'react';
// import { useLocation } from 'react-router-dom';

//const ReviewDate = () => {
//     const location = useLocation();
//     const { filteredReviews } = location.state;

//     return (
//         <div>
//             <h2>Các đánh giá đã lọc</h2>
//             <ul>
//                 {filteredReviews.map((review, index) => (
//                     <li key={index}>
//                         <p>Đánh giá số {index + 1}</p>
//                         <p>Ngày đánh giá: {review.datereview}</p>
//                         <p>Số sao: {review.numberofstar}</p>
//                         <p>Bình luận: {review.content}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

//export default ReviewDate;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import "../../components/table/tableOrderBy.css"
import { Link } from 'react-router-dom';


// // Lưu trữ kết quả vào state
// const customerTotalPurchaseList = Object.keys(customerPurchaseMap).map(customerId => ({
//     id: customerId,
//     name: `${customerData.find(customer => customer.id === parseInt(customerId))?.firstname} ${customerData.find(customer => customer.id === parseInt(customerId))?.lastname}`,
//     phoneNumber: customerData.find(customer => customer.id === parseInt(customerId))?.phonenumber,
//     totalPurchase: customerPurchaseMap[customerId]
// }));



const ReviewDate = () => {
    const [customerTotalPurchase, setCustomerTotalPurchase] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy danh sách khách hàng và đơn hàng từ API
                const customersResponse = await axios.get('http://localhost:8080/api/account/3');
                const ordersResponse = await axios.get('http://localhost:8080/api/order/all');

                // Chuyển đổi dữ liệu thành dạng object với customerId là khóa và tổng số tiền đã mua là giá trị
                const orders = ordersResponse.data;
                const customers = {};
                orders.forEach(order => {
                    const customerId = order.account.id;
                    const totalPurchase = order.bill.totalprice;
                    if (customers[customerId]) {
                        customers[customerId] += totalPurchase;
                    } else {
                        customers[customerId] = totalPurchase;
                    }
                });

                // Tạo mảng dữ liệu khách hàng với thông tin tổng số tiền đã mua
                // const customerArray = Object.keys(customers).map((customerId, index) => {
                const customerArray = Object.keys(customers).map(customerId => {
                    const customer = customersResponse.data.find(customer => customer.id === parseInt(customerId));
                    return {
                        id: customerId,
                        //index: index + 1,
                        firstname: customer.firstname,
                        lastname: customer.lastname,
                        phonenumber: customer.phonenumber,
                        address: customer.address,
                        totalPurchase: customers[customerId],
                    };
                });
                // Sắp xếp danh sách khách hàng theo tổng số tiền đã mua từ cao đến thấp
                customerArray.sort((a, b) => b.totalPurchase - a.totalPurchase);
                // Thêm trường ranking để lưu số thứ tự
                customerArray.forEach((customer, index) => {
                    customer.ranking = index + 1;
                });
                // Lưu trữ kết quả vào state
                setCustomerTotalPurchase(customerArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { field: 'ranking', headerName: 'STT', width: 90 },
        { field: 'id', headerName: 'ID KH', width: 120 },
        { field: 'firstname', headerName: 'Họ', width: 120 },
        { field: 'lastname', headerName: 'Tên', width: 120 },
        { field: 'phonenumber', headerName: 'Số điện thoại', width: 150 },
        {
            field: 'address', headerName: 'Địa chỉ', width: 240,
            renderCell: (params) => (
                <div>
                    {params.value ? (
                        <div>
                            <p>{params.value.street ? params.value.street + ', ' : '_, '}
                                {params.value.ward ? params.value.ward + ', ' : '_, '}
                                {params.value.district ? params.value.district + ', ' : '_, '}
                                {params.value.province ? params.value.province + '. ' : '_'}
                            </p>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            ),
        },
        { field: 'totalPurchase', headerName: 'Tổng số tiền đã mua', width: 200 },
        {
            field: 'action',
            headerName: '',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <Link to={`/admin/customerManagement/customerDetail/${params.row.id}`} style={{ textDecoration: "none" }}>
                    <div className="viewButton">Xem chi tiết</div>
                </Link>
            )
        }
    ];

    return (
        <div style={{ height: 320, width: '100%' }}>
            <DataGrid className="datagridCustomerStats"
                rows={customerTotalPurchase}
                columns={columns}
                disableSelectionOnClick={false} // Đặt giá trị false để tắt chức năng chọn khi click
                checkboxSelection={false} // Đặt giá trị false để ẩn ô kiểm checkbox
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 4 },
                    },
                }}
                pageSizeOptions={[4]}
            />
        </div>
    );
};

export default ReviewDate;