
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "../../css/mngtForm.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { productInputs } from "../../data/dataFormProductMngt";
//{ title }
const AddProduct = () => {
    // const history = useHistory();
    const navigate = useNavigate();

    //     //const [inputs] = useState(productInputs);
    //     const [categories, setCategories] = useState([]);
    //     const [selectedCategory, setSelectedCategory] = useState('');
    //     //const [fetchedData, setFetchedData] = useState(false);

    //     const [name, setName] = useState('');
    //     const [url_image_product, setImg] = useState('');
    //     const [price, setPrice] = useState('');
    //     const [description, setDescription] = useState('');
    //     const [message, setMessage] = useState('');
    //     const [showProgressBar, setShowProgressBar] = useState(false);

    //     // useEffect(() => {
    //     //     if (!fetchedData) {
    //     //         fetchData(); // Chỉ fetch dữ liệu nếu fetchedData là false
    //     //         setFetchedData(true); // Đánh dấu đã fetch dữ liệu
    //     //     }
    //     // }, [fetchedData]);
    //     useEffect(() => {
    //         fetchData();
    //     }, []);

    //     // useEffect(() => {
    //     //     //fetchData();
    //     //     if (showProgressBar) {
    //     //         setFetchedData(true);
    //     //         const timer = setTimeout(() => {
    //     //             setMessage('');
    //     //             setShowProgressBar(false);
    //     //         }, 1500); // Thời gian hiển thị thanh thời gian chạy: 3000ms
    //     //         return () => clearTimeout(timer);
    //     //     }
    //     //     // else {
    //     //     //     fetchData(); // Gọi fetchData chỉ khi showProgressBar là false
    //     //     // }
    //     // }, [showProgressBar]);
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

    //     const handleImgChange = (event) => {
    //         setImg(event.target.value);

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

    //         //event.preventDefault();
    //         setShowProgressBar(true);
    //         try {
    //             const response = await axios.post(`http://localhost:8080/api/product/add/${selectedCategory}`, { name, url_image_product, description });
    //             if (response.status === 201) {
    //                 setMessage('Tạo Món ăn thành công!');
    //                 setName('');
    //                 setImg('');
    //                 setPrice('');
    //                 setDescription('');
    //                 setSelectedCategory('');
    //                 console.log(response);

    //                 // // Tự động xóa thông báo sau 3 giây
    //                 // setTimeout(() => {
    //                 //     setMessage('');
    //                 // }, 3000);
    //             } else {
    //                 setMessage('Tạo thất bại.');
    //             }
    //         } catch (error) {
    //             console.error('Error adding category:', error);
    //             setMessage('Có lỗi xảy ra.');
    //         }
    //         finally {
    //             // Ẩn thanh tiến trình sau khi hoàn thành submit (có thể thay đổi thời gian dựa vào nhu cầu của bạn)
    //             setTimeout(() => {
    //                 setShowProgressBar(false);
    //             }, 3000); // Thời gian hiển thị thanh tiến trình: 3000ms (3 giây)
    //         }
    //     };
    //     return (
    //         <div className="new">
    //             <Sidebar />
    //             <div className="newContainer">
    //                 <Navbar />
    //                 <div className="title top">
    //                     <h1>Thêm Món ăn</h1>
    //                 </div>
    //                 <div className="bottom">
    //                     <div className="column">
    //                         <form onSubmit={handleSubmit}>
    //                             {/* tải ảnh từ máy */}
    //                             {/* <div className="formInput">
    //                                 <label htmlFor="file">
    //                                     Image: <DriveFolderUploadOutlinedIcon className="icon" />
    //                                 </label>
    //                                 <input
    //                                     type="file"
    //                                     id="file"
    //                                     onChange={(e) => setFile(e.target.files[0])}
    //                                     style={{ display: "none" }}
    //                                 />
    //                             </div> */}

    //                             {/* {inputs.map((input) => (
    //                                 <div className="formInput" key={input.id}>
    //                                     <label>{input.label}</label>
    //                                     <input type={input.type} placeholder={input.placeholder} />
    //                                 </div>
    //                             ))}
    //                             <button >Thêm</button>
    //                         </form>
    //                     </div> */}
    //                             <div className="formInput">
    //                                 <div>
    //                                     <label>Tên món ăn:</label>
    //                                     <input type="text" value={name} onChange={handleNameChange} required />
    //                                 </div>
    //                                 <div>
    //                                     <label>Đường dẫn đến hình ảnh:</label>
    //                                     <input type="text" value={url_image_product} onChange={handleImgChange} required />
    //                                 </div>
    //                                 <div>
    //                                     <label>Giá:</label>
    //                                     <input type="text" value={price} onChange={handlePriceChange} required />
    //                                 </div>
    //                                 <div>
    //                                     <label>Phân loại:</label>
    //                                     {/* <input type="text" value={selectedCategory} onChange={handleSelectChange} required /> */}
    //                                     <select value={selectedCategory} onChange={handleSelectChange}>
    //                                         {/* <option value="">Select category...</option> */}
    //                                         {categories.map((category) => (
    //                                             <option key={category.id} value={category.title}>
    //                                                 {category.title}
    //                                             </option>
    //                                         ))}
    //                                     </select>
    //                                 </div>
    //                                 <div>
    //                                     <label>Mô tả:</label>
    //                                     <input type="text" value={description} onChange={handleDescriptionChange} required />
    //                                 </div>
    //                                 <button type="submit" >Thêm</button>
    //                             </div>
    //                         </form>
    //                         {message && (
    //                             <div className="success-message">
    //                                 {message}
    //                                 {showProgressBar && <div className="progress-bar" />}
    //                             </div>
    //                         )}
    //                     </div>

    //                 </div>
    //             </div>
    //         </div>

    //     );
    // };

    const [title, setTitle] = useState('');
    const [url_image_category, setImg] = useState('');


    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [name, setName] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);

    useEffect(() => {
        fetchData();
        if (showProgressBar) {
            const timer = setTimeout(() => {
                setMessage('');
                setShowProgressBar(false);
            }, 1500); // Thời gian hiển thị thanh thời gian chạy: 3000ms
            return () => clearTimeout(timer);
        }
    }, [showProgressBar]);
    // useEffect(() => {
    //     fetchData();

    // }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/category/');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleImgChange = (event) => {
        setImg(event.target.value);

    };
    const handleSubmitAddCategory = async (event) => {
        event.preventDefault();
        setShowProgressBar(true);
        try {
            const response = await axios.post('http://localhost:8080/api/category/add', { title, url_image_category });
            if (response.status === 201) {
                setMessage('Tạo Danh mục món ăn thành công!');
                setTitle('');
                setImg('');

                // // Tự động xóa thông báo sau 3 giây
                // setTimeout(() => {
                //     setMessage('');
                // }, 1500);
                fetchData();
            } else {
                setMessage('Tạo thất bại.');
            }
        } catch (error) {
            console.error('Error adding category:', error);
            setMessage('Có lỗi xảy ra.');
            // } finally {
            //     // Ẩn thanh tiến trình sau khi hoàn thành submit (có thể thay đổi thời gian dựa vào nhu cầu của bạn)
            //     setTimeout(() => {
            //         setShowProgressBar(false);
            //     }, 1500); // Thời gian hiển thị thanh tiến trình: 3000ms (3 giây)
        }
    };


    const handleSelectChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleUrlImageChange = (event) => {
        setUrlImage(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmitAddProduct = async (event) => {
        if (!selectedCategory || !name) {
            setMessage('Vui lòng chọn danh mục và nhập tên món ăn.');
            return;
        }
        event.preventDefault();

        setShowProgressBar(true); // Hiển thị thanh tiến trình khi bắt đầu submit

        try {
            const response = await axios.post(`http://localhost:8080/api/product/add/${selectedCategory}`, { name, url_image_product: urlImage, price, description });
            if (response.status === 201) {
                setMessage('Tạo món ăn thành công!');
                setName('');
                setSelectedCategory('');
                setUrlImage('');
                setPrice('');
                setDescription('');


                setTimeout(() => {

                    navigate('/admin/productManagement');
                }, 2000); // Hiển
                //history.push('/productManagement');
                //return <Redirect to="/productManagement" />;

            } else {
                setMessage('Tạo món ăn thất bại.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            setMessage('Có lỗi xảy ra khi tạo món ăn.');
            // } finally {
            //     // Ẩn thanh tiến trình sau khi hoàn thành submit (có thể thay đổi thời gian dựa vào nhu cầu của bạn)
            //     setTimeout(() => {
            //         setShowProgressBar(false);
            //     }, 1500); // Thời gian hiển thị thanh tiến trình: 3000ms (3 giây)
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <Link to={`/admin/productManagement`} style={{ textDecoration: "none" }}>
                    {/* <div className="viewButton">Xem chi tiết</div> */}
                    <div className="arrow-back-icon">
                        <ArrowBackIcon />
                    </div>
                </Link>
                <div className="bottom">
                    <div className="column2">

                        <div className="column">
                            <div className="title top">
                                <h1>Thêm Danh mục</h1>
                            </div>
                            <form onSubmit={handleSubmitAddCategory}>
                                <div className="formInput">
                                    <label >Tên danh mục:</label>
                                    <input type="text" value={title} onChange={handleTitleChange} required />
                                </div>
                                <div className="formInput">
                                    <label>Đường dẫn hình ảnh danh mục:</label>
                                    <input type="text" value={url_image_category} onChange={handleImgChange} required />
                                </div>
                                <div className="formInput">

                                </div>
                                <button type="submit" >Tạo Danh Mục</button>
                            </form>
                        </div>

                        <div className="column">
                            <div className="title top">
                                <h1>Thêm Món ăn</h1>
                            </div>
                            <form onSubmit={handleSubmitAddProduct}>
                                <div className="formInput">
                                    <label>Tên món ăn:</label>
                                    <input id="name" type="text" value={name} onChange={handleNameChange} />
                                </div>
                                <div className="formInput">
                                    <label>Đường dẫn hình ảnh món ăn:</label>
                                    <input id="urlImage" type="text" value={urlImage} onChange={handleUrlImageChange} />
                                </div>
                                <div className="formInput">
                                    <label>Giá:</label>
                                    <input id="price" type="text" value={price} onChange={handlePriceChange} />
                                </div>
                                <div className="formInput">
                                    <label>Danh mục:</label>
                                    <select id="category" value={selectedCategory} onChange={handleSelectChange}>
                                        <option>Chọn 1 trong số các danh mục sau</option> {/* Mục mặc định */}
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.title}</option>
                                        ))}
                                    </select>
                                </div>



                                <div className="formInput">
                                    <label>Mô tả:</label>
                                    <textarea id="description" value={description} onChange={handleDescriptionChange} />
                                </div>
                                <button type="submit">Tạo Món Ăn</button>


                            </form>

                            {/* {showProgressBar && <div className="progress-bar">Đang xử lý...</div>}
                        {message && <p>{message}</p>} */}

                            {/* {message && (
                            <div className="success-message">
                                {message}
                                {showProgressBar && <div className="progress-bar" />}
                            </div>
                        )} */}

                            {/* <div>
                           
                            <div>
                                <label htmlFor="category">Danh Mục:</label>
                                <select id="category" value={selectedCategory} onChange={handleSelectChange}>
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="name">Tên Món Ăn:</label>
                                <input id="name" type="text" value={name} onChange={handleNameChange} />
                            </div>
                            <div>
                                <label htmlFor="urlImage">Link Ảnh Món Ăn:</label>
                                <input id="urlImage" type="text" value={urlImage} onChange={handleUrlImageChange} />
                            </div>
                            <div>
                                <label htmlFor="price">Giá:</label>
                                <input id="price" type="text" value={price} onChange={handlePriceChange} />
                            </div>
                            <div>
                                <label htmlFor="description">Mô Tả:</label>
                                <textarea id="description" value={description} onChange={handleDescriptionChange} />
                            </div>
                            <button onClick={handleSubmit}>Tạo Món Ăn</button> */}
                            {/* {showProgressBar && <div className="progress-bar">Đang xử lý...</div>}
                                {message && <p>{message}</p>} */}
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

export default AddProduct;
