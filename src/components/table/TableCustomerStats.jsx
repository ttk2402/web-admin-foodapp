import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import "./tableOrderBy.css"
import { Link } from 'react-router-dom';
//Đã check
const TableCustomerStats = () => {
    const [customerReviews, setcustomerReviews] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/review/all');
                const reviews = response.data;
                const customers = {};
                // Tính số lượng đánh giá và điểm trung bình của mỗi sản phẩm
                reviews.forEach(review => {
                    const customerId = review.account.id;
                    if (!customers[customerId]) {
                        customers[customerId] = {
                            id: review.account.id,
                            firstname: review.account.firstname,
                            lastname: review.account.lastname,
                            phonenumber: review.account.phonenumber,
                            totalReviews: 1,
                            totalStars: review.numberofstar
                        };
                    } else {
                        customers[customerId].totalReviews += 1;
                        customers[customerId].totalStars += review.numberofstar;
                    }
                });
                const customerArray = Object.values(customers).map((customer, index) => {
                    return {
                        index: index + 1,
                        id: customer.id,
                        firstname: customer.firstname,
                        lastname: customer.lastname,
                        phonenumber: customer.phonenumber,
                        totalReviews: customer.totalReviews,
                        averageStars: customer.totalStars / customer.totalReviews
                    };
                });
                setcustomerReviews(customerArray);
                // Giới hạn số lượng dòng hiển thị là 5     //chi hien thi 5 dong
                // setcustomerReviews(customerArray.slice(0, 5));

                // // Tính tổng số trang dựa trên số lượng dòng trên mỗi trang    //c2
                // setTotalPages(Math.ceil(customerArray.length / rowsPerPage));
                // // Lấy chỉ mục bắt đầu và kết thúc của dòng trên mỗi trang
                // const indexOfLastRow = currentPage * rowsPerPage;
                // const indexOfFirstRow = indexOfLastRow - rowsPerPage;
                // // Cắt mảng để lấy ra dòng trên trang hiện tại
                // const currentRows = customerArray.slice(indexOfFirstRow, indexOfLastRow);
                // setcustomerReviews(currentRows);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const columns = [
        { field: 'index', headerName: 'STT', width: 80 },
        { field: 'id', headerName: 'ID KH', width: 150 },
        { field: 'firstname', headerName: 'Họ', width: 150 },
        { field: 'lastname', headerName: 'Tên', width: 150 },
        { field: 'phonenumber', headerName: 'SĐT', width: 200 },
        { field: 'totalReviews', headerName: 'Số đánh giá', width: 150 },
        { field: 'averageStars', headerName: 'Số sao trung bình', width: 150 },
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
                rows={customerReviews}
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
export default TableCustomerStats;
