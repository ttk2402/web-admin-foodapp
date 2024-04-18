import "../../css/mngtTableHome.css";
import { DataGrid } from '@mui/x-data-grid';
import { discountMngtColumns, storageDiscountMngtRows } from "../../data/dataDiscountMngtHome ";
import { Link } from "react-router-dom";
import { useState } from "react";
//Đã check
const StorageTableDiscountMngt = () => {
    const [data, setData] = useState(storageDiscountMngtRows);
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };
    const handleActive = (id) => {
        setData(data.filter((item) => item.id !== id));
    };
    const actionColumn = [
        {
            field: "action",
            headerName: "",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/discountManagement/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">Xem chi tiết</div>
                        </Link>
                        <div
                            className="activeButton"
                            onClick={() => handleActive(params.row.id)}
                        >
                            Sử dụng
                        </div>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Xóa
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable" >
            <DataGrid className="datagrid"
                rows={data}
                columns={discountMngtColumns.concat(actionColumn)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 9 },
                    },
                }}
                pageSizeOptions={[9]}
                checkboxSelection
            />
        </div>
    )
}
export default StorageTableDiscountMngt;