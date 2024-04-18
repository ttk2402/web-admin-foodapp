import "../../css/mngtHome.css"
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TabContent from "../../components/tab-content/tab-content";
//import { Link } from "react-router-dom";
import AllTableOrderMngt from "../../components/tableOrderMngtHome/AllTableOrderMngt";
import ProcessingTableOrderMngt from "../../components/tableOrderMngtHome/ProcessingTableOrderMngt";
import ApprovedTableOrderMngt from "../../components/tableOrderMngtHome/ApprovedTableOrderMngt ";
import CompleteTableOrderMngt from "../../components/tableOrderMngtHome/CompleteTableOrderMngt";
import CancelTableOrderMngt from "../../components/tableOrderMngtHome/CancelTableOrderMngt";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WatingConfirmationTableOrderMngt from "../../components/tableOrderMngtHome/WatingConfirmationTableOrderMngt";
//Giao diện k call API
//Đã check
const OrderMngtHome = () => {
    const contents = [
        {
            title: "Tất cả đơn hàng",
            content: (
                <AllTableOrderMngt />
            ),
        },
        {
            title: "Đơn hàng chờ xác nhận",
            content: (
                <WatingConfirmationTableOrderMngt />
            )
        },
        {
            title: "Đơn hàng chờ lấy hàng",
            content: (
                <ProcessingTableOrderMngt />
            )
        },
        {
            title: "Đơn hàng đang đến ",
            content: (
                <ApprovedTableOrderMngt />
            ),
        },
        {
            title: "Đơn hàng đã giao",
            content: (
                <CompleteTableOrderMngt />
            ),
        },
        {
            title: "Đơn hàng đã hủy",
            content: (
                <CancelTableOrderMngt />
            ),
        },
    ];
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar title="Quản lý đơn hàng" />
                <div className="headerMngt">
                    <div className="search">
                        <input type="text" placeholder="Search..." />
                        <div className='icon'>
                            <SearchOutlinedIcon />
                        </div>
                    </div>
                </div>
                <TabContent input={contents} />
            </div>
        </div>
    )
}
export default OrderMngtHome;