
import "../../css/mngtHome.css"
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import TabContent from "../../components/tab-content/tab-content";

import ActiveTableCustomerMngt from "../../components/tableCustomerMngtHome/ActiveTableCustomerMngt";
import BlockTableCustomerMngt from "../../components/tableCustomerMngtHome/BlockTableCustomerMngt";
import AllTableCustomerMngt from "../../components/tableCustomerMngtHome/AllTableCustomerMngt";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
//import { Link } from "react-router-dom";

const CustomerMngtHome = () => {
    const contents = [
        {
            title: "Tất cả khách hàng",
            content: (
                <AllTableCustomerMngt />
            ),
        },
        {
            title: "Tài khoản hoạt động",
            content: (
                <ActiveTableCustomerMngt />
            ),
        },
        {
            title: "Tài khoản đã khóa",
            content: (
                <BlockTableCustomerMngt />
            ),
        },

    ];
    return (

        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar title="Quản lý Khách hàng" />

                <div className="headerMngt">
                    <div className="search">
                        <input type="text" placeholder="Search..." />
                        <div className='icon'>
                            <SearchOutlinedIcon />
                        </div>
                    </div>
                    {/* <div className="linkAdd">
                        <Link to="/customerManagement/addCustomer" style={{ textDecoration: "none" }}>
                            <div className="textAdd">Thêm khách hàng</div>
                        </Link>
                    </div> */}
                </div>

                <TabContent input={contents} />
            </div>


        </div>

    )
}

export default CustomerMngtHome