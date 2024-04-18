
import "../../css/mngtHome.css"

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
//import TabContent from "../../components/tab-content/tab-content";
import { Link } from "react-router-dom";
// import AllTableDiscountMngt from "../../components/tableDiscountMngtHome/AllTableDiscountMngt";
// import ActiveTableDiscountMngt from "../../components/tableDiscountMngtHome/ActiveTableDiscountMngt";
// import StorageTableDiscountMngt from "../../components/tableDiscountMngtHome/StorageTableDiscountMngt ";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
//import ExpiredTableDiscountMngt from "../../components/tableDiscountMngtHome/ExpiredTableDiscountMngt";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DiscountMngtHome = () => {

    const [data, setData] = useState([]);
    //const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);

    const fetchData = async () => {
        try {
            //const response = await Data();
            const response = await axios.get('http://localhost:8080/api/discount/all');
            setData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    useEffect(() => {
        fetchData();
        if (showProgressBar) {
            const timer = setTimeout(() => {
                setMessage('');
                setShowProgressBar(false);
            }, 2000); // Thời gian hiển thị thanh thời gian chạy: 3000ms
            return () => clearTimeout(timer);
        }
    }, [showProgressBar]);

    const handleLockUnlock = async (params) => {
        const discountId = params.row.id;
        // const currentStatus = params.row.isExist;
        setShowProgressBar(true);
        try {

            const response = await axios.put(`http://localhost:8080/api/discount/changeStatus/${discountId}`);

            if (response.status === 200) {
                setMessage('Cập nhật trạng thái thành công.!');
                //fetchData();

            } else {
                setMessage('Cập nhật trạng thái thất bại.');
            }

            // Gọi lại API để cập nhật dữ liệu
            fetchData();
        } catch (error) {
            console.error('Error updating account status:', error);
        }
    };

    // const formatDate = (dateString) => {
    //     const [year, month, day] = dateString.split('-');
    //     return `${day}/${month}/${year}`;
    // };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        // { field: 'useName', headerName: 'Tên tài khoản', width: 150 },
        { field: 'code', headerName: 'Tên', width: 150 },
        {
            field: 'percent', headerName: 'Giá trị (%)', width: 150,
            valueGetter: (params) =>
                `${params.row.percent * 100}%`,
        },

        {
            field: 'startdate', headerName: 'Ngày bắt đầu', width: 200,
            valueGetter: (params) => params.row.startdate,
        },

        {
            field: 'enddate', headerName: 'Ngày kết thúc', width: 200,
            valueGetter: (params) => params.row.enddate,
        },
        {
            field: "isExist",
            headerName: "Trạng thái",
            width: 120,
            renderCell: (params) => {
                const status = params.row?.isExist; // Sử dụng optional chaining để tránh lỗi nếu 'account_status' không được định nghĩa
                // console.log(`${status}`);
                return (

                    <div className={`cellWithStatus ${status}`}>

                        {status === true ? 'Đang áp dụng' : 'Hết mã '}
                        {/* {status} */}

                    </div>



                );
            },
        },

    ]
    const actionColumn = [

        {
            field: "action",
            headerName: "",
            width: 300,
            renderCell: (params) => {
                const currentStatus = params.row?.isExist;

                return (

                    <div className="cellAction">
                        <Link to={`/admin/discountManagement/discountDetail/${params.row.code}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">Xem chi tiết</div>
                        </Link>

                        <div className="viewButton" onClick={() => handleLockUnlock(params)}>
                            {currentStatus === true ? <LockIcon /> : <LockOpenIcon />}
                        </div>
                        {/* if status:Hoạt động => button: Khóa (Khóa => Mở khóa) */}
                        {/* <div
                            className="blockButton"
                        //onClick={() => handleBlock(params.row.id)}
                        >
                            Khóa
                        </div> */}
                        <Link to={`/admin/discountManagement/editDiscount/${params.row.id}`} className="editButton" style={{ textDecoration: "none" }}>
                            <EditIcon />
                        </Link>

                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            <DeleteIcon />
                        </div>
                    </div>
                );
            },
        },
    ];
    ///chua co api delete
    //api chinh sua chua dung
    const handleDelete = async (id) => {
        setShowProgressBar(true);
        try {
            const response = await axios.delete(`http://localhost:8080/api/discount/${id}`, {
                headers: {
                    'Content-Type': 'application/json', // Đảm bảo rằng yêu cầu sử dụng JSON
                }
            });
            if (response.status === 200) {
                setMessage('Xóa khuyến mãi thành công!');
                setData(data.filter((item) => item.id !== id));

            } else {
                setMessage('Xóa khuyến mãi thất bại.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            setMessage('Lỗi!');
        }
    };

    const sortModel = [
        {
            field: 'id',
            sort: 'desc', // Sắp xếp giảm dần
        },
    ];

    // const contents = [
    //     {
    //         title: "Tất cả khuyến mãi",
    //         content: (
    //             <AllTableDiscountMngt />
    //         ),
    //     },
    //     {
    //         title: "Khuyến mãi đang áp dụng",
    //         content: (
    //             <ActiveTableDiscountMngt />
    //         ),
    //     },
    //     {
    //         title: "Khuyến mãi đã lưu kho",
    //         content: (
    //             <StorageTableDiscountMngt />
    //         ),
    //     },
    //     {
    //         title: "Khuyến mãi đã hết hạn",
    //         content: (
    //             <ExpiredTableDiscountMngt />
    //         ),
    //     },

    // ];
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar title="Quản lý khuyến mãi" />
                <div className="headerMngt">
                    <div className="search">
                        <input type="text" placeholder="Search..." />
                        <div className='icon'>
                            <SearchOutlinedIcon />
                        </div>
                    </div>
                    <div className="linkAdd">
                        <Link to="/admin/discountManagement/addDiscount" style={{ textDecoration: "none" }}>
                            <div className="textAdd">Thêm khuyến mãi</div>
                        </Link>
                    </div>
                </div>
                {/* <TabContent input={contents} /> */}
                <div className="lp-tab-content">
                    <div className="tab">

                        <button
                            className={`tab-link`}
                        >
                            Các khuyến mãi
                        </button>
                        {/* <button
                            className={`tab-link`}
                        >
                            Các khuyến mãi2
                        </button> */}

                    </div>

                    <div className="tab-content-wrapper">

                        <div className="datatable" >
                            {message && (
                                <div className="success-message">
                                    {message}
                                    {showProgressBar && <div className="progress-bar" />}
                                </div>
                            )}
                            <DataGrid className="datagrid"
                                rows={data}  //Data
                                columns={columns.concat(actionColumn)}

                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 9 },
                                    },
                                }}
                                pageSizeOptions={[9]}
                                checkboxSelection
                                sortModel={sortModel}
                            />
                        </div>


                    </div>
                </div>


            </div>


        </div>

    )
}

export default DiscountMngtHome