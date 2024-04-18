
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "../../css/mngtForm.css";

import { useState } from "react";
import { productInputs } from "../../data/dataFormProductMngt";

const EditProductsai = () => {
    //const { productId } = useParams(); // Lấy productId từ URL
    const [inputs] = useState(productInputs);
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="title top">
                    <h1>Chỉnh sửa món ăn</h1>
                </div>
                <div className="bottom">
                    <div className="column">
                        <form  >
                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} value={input.value} />

                                </div>
                            ))}
                            <button type="submit"> Cập nhật </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default EditProductsai;



import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "../../css/mngtForm.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
//import { productInputs } from "../../data/dataFormProductMngt";
//{ title }
const EditProduct = () => {
    // const history = useHistory();
    const { productId } = useParams(); // Lấy productId từ URL
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [url_image_category, setImg] = useState('');


    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [name, setName] = useState('');
    const [url_image_product, setUrlImage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);

    const [product, setProduct] = useState({
        name: '',
        url_image_product: '',
        price: '',
        description: '',
        category_id: '',

    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData(productId);
        if (showProgressBar) {
            const timer = setTimeout(() => {
                setMessage('');
                setShowProgressBar(false);
            }, 1500); // Thời gian hiển thị thanh thời gian chạy: 3000ms
            return () => clearTimeout(timer);
        }

    }, [productId, showProgressBar]);
    // useEffect(() => {
    //     fetchData();

    // }, []);

    const fetchData = async () => {
        try {
            // Thực hiện lấy dữ liệu sản phẩm dựa trên productId
            //const response = await fetch(`api/product/${productId}`);
            const response = await axios.get(`http://localhost:8080/api/product/${productId}`);
            const response2 = await axios.get('http://localhost:8080/api/category/');
            setCategories(response2.data);
            if (response.status === 200) {
                const contentType = response.headers['content-type'];
                if (contentType && contentType.includes('application/json')) {
                    setProduct(response.data);
                } else {
                    throw new Error('Invalid content type');
                }
            } else {
                throw new Error('Network response was not ok');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product data:', error);
            setError('Error fetching product data. Please try again later.');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>No product found.</div>;
    }


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
    // Xử lý thay đổi giá trị trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
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
            const response = await axios.put(`http://localhost:8080/api/product/${productId}`, product);
            if (response.status === 201) {
                setMessage('Tạo món ăn thành công!');



                setTimeout(() => {

                    navigate('/productManagement');
                }, 1500); // Hiển
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
                                    <input id="name" type="text" name="name" value={product.name} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Đường dẫn hình ảnh món ăn:</label>
                                    <input id="urlImage" type="text" name="url_image_product" value={product.url_image_product} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Giá:</label>
                                    <input id="price" type="text" name="price" value={product.price} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Danh mục:</label>
                                    <select id="category" name="setCategories" value={product.category.id} onChange={handleChange}>

                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.title}</option>
                                        ))}
                                    </select>
                                </div>



                                <div className="formInput">
                                    <label>Mô tả:</label>
                                    <textarea id="description" name="description" value={product.description} onChange={handleChange} />
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

export default EditProduct;





import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "../../css/mngtForm.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
//import { productInputs } from "../../data/dataFormProductMngt";
//{ title }
const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        url_image_product: '',
        price: '',
        description: '',
        category_id: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, [productId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product/${productId}`);
            const response2 = await axios.get('http://localhost:8080/api/category/');
            setCategories(response2.data);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product data:', error);
            setError('Error fetching product data. Please try again later.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmitAddProduct = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/product/${productId}`, product);
            if (response.status === 200) {
                setMessage('Product updated successfully.');
                setTimeout(() => {
                    navigate('/productManagement');
                }, 1500);
            } else {
                setError('Failed to update product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Error updating product. Please try again later.');
        }
    };
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />

                <div className="bottom">
                    <div className="column2">
                        <div className="column">
                            <div className="title top">
                                <h1>Thêm Món ăn</h1>
                            </div>
                            <form onSubmit={handleSubmitAddProduct}>
                                <div className="formInput">
                                    <label>Tên món ăn:</label>
                                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Đường dẫn hình ảnh món ăn:</label>
                                    <input type="text" name="url_image_product" value={product.url_image_product} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Giá:</label>
                                    <input type="text" name="price" value={product.price} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Danh mục:</label>
                                    <select name="category_id" value={product.category_id} onChange={handleChange}>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="formInput">
                                    <label>Mô tả:</label>
                                    <textarea name="description" value={product.description} onChange={handleChange} />
                                </div>
                                <button type="submit">Tạo Món Ăn</button>
                            </form>
                            {message && <div className="success-message">{message}</div>}
                            {error && <div className="error-message">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
