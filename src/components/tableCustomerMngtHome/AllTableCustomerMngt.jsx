import "../../css/mngtTableHome.css";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
//Đã check
const AllTableCustomerMngt = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [showProgressBar, setShowProgressBar] = useState(false);
    const fetchData = async () => {
        try {
            //const response = await Data();
            const response = await axios.get('http://localhost:8080/api/account/1');
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
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
        const accountId = params.row.id;
        const currentStatus = params.row.account_status?.status;// Sử dụng optional chaining để tránh lỗi nếu 'status_account' không được định nghĩa
        setShowProgressBar(true);
        try {
            if (currentStatus === 'active') {
                const response = await axios.put(`http://localhost:8080/api/account/block/${accountId}`);

                if (response.status === 200) {
                    setMessage('Khóa tài khoản thành công.!');

                    fetchData();
                } else {
                    setMessage('Khóa tài khoản thất bại.');
                }
            } else if (currentStatus === 'blocked') {
                const response = await axios.put(`http://localhost:8080/api/account/open/${accountId}`);

                if (response.status === 200) {
                    setMessage('Mở tài khoản thành công.!');
                    fetchData();

                } else {
                    setMessage('Khóa tài khoản thất bại.');
                }
            }
            // Gọi lại API để cập nhật dữ liệu
            fetchData();
        } catch (error) {
            console.error('Error updating account status:', error);
        }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        // { field: 'useName', headerName: 'Tên tài khoản', width: 150 },
        { field: 'firstname', headerName: 'Họ', width: 100 },
        { field: 'lastname', headerName: 'Tên', width: 100 },

        { field: 'phonenumber', headerName: 'Số điện thoại', width: 150 },

        { field: 'email', headerName: 'Email', width: 150 },
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

        {
            field: "account_status.status",
            headerName: "Trạng thái",
            width: 90,
            renderCell: (params) => {
                const status = params.row.account_status?.status; // Sử dụng optional chaining để tránh lỗi nếu 'account_status' không được định nghĩa

                return (

                    <div className={`cellWithStatus ${status}`}>
                        {status === 'active' ? 'Hoạt động' : 'Khóa'}
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
                const currentStatus = params.row.account_status?.status;
                return (
                    <div className="cellAction">
                        <Link to={`/admin/customerManagement/customerDetail/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">Xem chi tiết</div>
                        </Link>
                        <div className="viewButton" onClick={() => handleLockUnlock(params)}>
                            {currentStatus === 'active' ? <LockIcon /> : <LockOpenIcon />}
                        </div>
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
    if (loading) {
        return <div>Loading...</div>;
    }
    const handleDelete = async (id) => {
        setShowProgressBar(true);
        try {
            const response = await axios.delete(`http://localhost:8080/api/account/${id}`, {
                headers: {
                    'Content-Type': 'application/json', // Đảm bảo rằng yêu cầu sử dụng JSON
                }
            });
            if (response.status === 200) {
                setMessage('Xóa khách hàng thành công!');
                setData(data.filter((item) => item.id !== id));
            } else {
                setMessage('Xóa khách hàng thất bại.');
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
    return (
        <div className="datatable" >
            {message && (
                <div className="success-message">
                    {message}
                    {showProgressBar && <div className="progress-bar" />}
                </div>
            )}
            <DataGrid className="datagrid"
                rows={data}
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
    )
}
export default AllTableCustomerMngt;