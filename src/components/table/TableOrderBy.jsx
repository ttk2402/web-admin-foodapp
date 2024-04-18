import "./tableOrderBy.css"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
//Đã check
const TableOrderBy = ({ orders }) => {
    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">ID Đơn hàng</TableCell>
                        <TableCell className="tableCell">Khách hàng</TableCell>
                        <TableCell className="tableCell">Ngày đặt hàng</TableCell>
                        <TableCell className="tableCell">Khuyến mãi áp dụng</TableCell>
                        <TableCell className="tableCell">Tổng tiền</TableCell>
                        <TableCell className="tableCell">Phương thức thanh toán</TableCell>
                        <TableCell className="tableCell">Trạng thái</TableCell>
                        <TableCell className="tableCell"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(orders) && orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="tableCell">{order.id}</TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <div className="firtName">{order.account.firstname} {order.account.lastname}</div>
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">{order.orderdate}</TableCell>
                            <TableCell className="tableCell">{order.discount?.code}</TableCell>
                            <TableCell className="tableCell">{order.bill.totalprice}</TableCell>
                            <TableCell className="tableCell"> {order.checkout?.method === 'Credit Card' ? 'Thẻ tín dụng'
                                : order.checkout?.method === 'cash' ? 'Tiền mặt' : order.checkout?.method === 'momo' ? 'Ví Momo' : ''}</TableCell>
                            <TableCell className="tableCell">
                                <span className={`status ${order.orderStatus?.status}`}>{order.orderStatus?.status === 'watingConfirmation' ? 'Chờ xác nhận'
                                    : order.orderStatus?.status === 'Processing' ? 'Chờ lấy hàng'
                                        : order.orderStatus?.status === 'beingTransported' ? 'Đang đến'
                                            : order.orderStatus?.status === 'Completed' ? 'Đã giao'
                                                : order.orderStatus?.status === 'Cancel' ? 'Hủy'
                                                    : ''}</span>
                            </TableCell>
                            <TableCell className="tableCell">
                                <Link to={`/admin/orderManagement/orderDetail/${order.id}`} style={{ textDecoration: "none" }}>
                                    <div className="viewButton">Xem chi tiết</div>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default TableOrderBy;