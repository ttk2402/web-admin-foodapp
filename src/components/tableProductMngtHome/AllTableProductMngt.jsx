import "../../css/mngtTableHome.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
//Đã check
function AllTableProductMngt() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        if (showProgressBar) {
            const timer = setTimeout(() => {
                setMessage('');
                setShowProgressBar(false);
            }, 2000); // Thời gian hiển thị thanh thời gian chạy: 2000ms
            return () => clearTimeout(timer);
        }
        fetchData();
    }, [showProgressBar]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/product/');
            const updatedData = response.data.map(product => ({
                ...product,
                categoryTitle: product.category.title
            }));
            setData(updatedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const filteredData = data.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categoryTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.price === parseFloat(searchTerm)) ||
        (product.id === parseFloat(searchTerm))
    );
    const handleReset = async () => {
        setSearchTerm('');
        fetchData();
    };
    const handleDelete = async (id) => {
        setShowProgressBar(true);
        try {
            const response = await axios.delete(`http://localhost:8080/api/product/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                setMessage('Xóa Món ăn thành công!');
                setData(data.filter(item => item.id !== id));
            } else {
                setMessage('Xóa thất bại.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            setMessage('Lỗi!');
        }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "name",
            headerName: "Tên",
            width: 260,
            renderCell: (params) => {
                return (
                    <div className="cellWithImg">
                        <img className="cellImg" src={params.row.url_image_product} alt="avatar" />
                        {params.row.name}
                    </div>
                );
            },
        },
        { field: 'price', headerName: 'Giá', width: 120 },
        { field: "description", headerName: "Mô tả", width: 200 },
        { field: "categoryTitle", headerName: "Loại", width: 180 },
    ];
    const actionColumn = [
        {
            field: "action",
            headerName: "",
            width: 350,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/admin/productManagement/productDetail/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">Xem chi tiết</div>
                        </Link>
                        <Link to={`/admin/productManagement/editProduct/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="editButton"><EditIcon /></div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon />
                        </div>
                    </div>
                );
            },
        },
    ];
    if (loading) {
        return <div>Loading...</div>;
    }
    const sortModel = [{ field: 'id', sort: 'desc' }];
    return (
        <div className="datatable">
            {message && (
                <div className="success-message">
                    {message}
                    {showProgressBar && <div className="progress-bar" />}
                </div>
            )}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo ID, tên, mô tả, loại hoặc giá"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <RefreshIcon
                    title="Tải lại dữ liệu"
                    onClick={handleReset}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
            </div>
            <div style={{ height: 526, width: '100%' }}>
                <DataGrid
                    className="datagrid"
                    rows={filteredData}
                    columns={columns.concat(actionColumn)}
                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 8 } } }}
                    pageSizeOptions={[8]}
                    checkboxSelection
                    sortModel={sortModel}
                />
            </div>
        </div>
    );
}
export default AllTableProductMngt;



//thêm chức năng xóa nhiều sản phẩm được chọn
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Link } from 'react-router-dom';
// import RefreshIcon from '@mui/icons-material/Refresh';

// function AllTableProductMngt() {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState('');
//     const [showProgressBar, setShowProgressBar] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedRows, setSelectedRows] = useState([]);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/product/');
//             const updatedData = response.data.map(product => ({
//                 ...product,
//                 categoryTitle: product.category.title
//             }));
//             setData(updatedData);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setLoading(false);
//         }
//     };

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const filteredData = data.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.categoryTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (product.price === parseFloat(searchTerm)) ||
//         (product.id === parseFloat(searchTerm))
//     );

//     const handleReset = async () => {
//         setSearchTerm('');
//         fetchData();
//     };

//     const handleDelete = async (id) => {
//         setShowProgressBar(true);
//         try {
//             const response = await axios.delete(`http://localhost:8080/api/product/${id}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
//             if (response.status === 200) {
//                 setMessage('Xóa Món ăn thành công!');
//                 setData(data.filter(item => item.id !== id));
//             } else {
//                 setMessage('Xóa thất bại.');
//             }
//         } catch (error) {
//             console.error('Error deleting product:', error);
//             setMessage('Lỗi!');
//         }
//     };

//     const handleDeleteSelectedRows = async () => {
//         setShowProgressBar(true);
//         const deletedIds = selectedRows;
//         try {
//             await Promise.all(deletedIds.map(async id => {
//                 const response = await axios.delete(`http://localhost:8080/api/product/${id}`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 });
//                 if (response.status === 200) {
//                     setMessage('Xóa Món ăn thành công!');
//                     setData(data.filter(item => !deletedIds.includes(item.id)));
//                 } else {
//                     setMessage('Xóa thất bại.');
//                 }
//             }));
//         } catch (error) {
//             console.error('Error deleting product:', error);
//             setMessage('Lỗi!');
//         } finally {
//             setShowProgressBar(false);
//         }
//     };

//     const columns = [
//         { field: "id", headerName: "ID", width: 80 },
//         {
//             field: "name",
//             headerName: "Tên",
//             width: 260,
//             renderCell: (params) => {
//                 return (
//                     <div className="cellWithImg">
//                         <img className="cellImg" src={params.row.url_image_product} alt="avatar" />
//                         {params.row.name}
//                     </div>
//                 );
//             },
//         },
//         { field: 'price', headerName: 'Giá', width: 120 },
//         { field: "description", headerName: "Mô tả", width: 200 },
//         { field: "categoryTitle", headerName: "Loại", width: 180 },
//     ];

//     const actionColumn = [
//         {
//             field: "action",
//             headerName: "",
//             width: 350,
//             renderCell: (params) => {
//                 return (
//                     <div className="cellAction">
//                         <Link to={`/admin/productManagement/productDetail/${params.row.id}`} style={{ textDecoration: "none" }}>
//                             <div className="viewButton">Xem chi tiết</div>
//                         </Link>
//                         <Link to={`/admin/productManagement/editProduct/${params.row.id}`} style={{ textDecoration: "none" }}>
//                             <div className="editButton"><EditIcon /></div>
//                         </Link>
//                         <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
//                             <DeleteIcon />
//                         </div>
//                     </div>
//                 );
//             },
//         },
//     ];

//     const handleSelectionModelChange = (newSelection) => {
//         console.log(newSelection)
//         setSelectedRows(newSelection.selectionModel);
//     };

//     return (
//         <div className="datatable">
//             <div className="search-bar">
//                 <input
//                     type="text"
//                     placeholder="Tìm kiếm theo ID, tên, mô tả, loại hoặc giá"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                 />
//                 <RefreshIcon
//                     title="Tải lại dữ liệu"
//                     onClick={handleReset}
//                     style={{ cursor: 'pointer', marginLeft: '10px' }}
//                 />
//                 <DeleteIcon
//                     title="Xóa các dòng đã chọn"
//                     onClick={handleDeleteSelectedRows}
//                     style={{ cursor: 'pointer', marginLeft: '10px' }}
//                 />
//             </div>
//             <DataGrid
//                 className="datagrid"
//                 rows={filteredData}
//                 columns={columns.concat(actionColumn)}
//                 pageSize={9}
//                 checkboxSelection
//                 onSelectionModelChange={handleSelectionModelChange}
//             />
//         </div>
//     );
// }

// export default AllTableProductMngt;
