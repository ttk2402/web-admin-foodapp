import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom"
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DiscountIcon from '@mui/icons-material/Discount';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StoreIcon from '@mui/icons-material/Store';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
//Đã check
const Sidebar = () => {

    const [nameUser, setNameUser] = useState("");

    useEffect(() => {
        const adminName = localStorage.getItem(`adminName`);
        if (adminName) {
            setNameUser(adminName);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('adminName');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('adminID');
        console.log('logout')
    };
    return (
        <div className='sidebar'>
            <div className="top">
                {nameUser && <span className="name">{nameUser}</span>}
            </div>
            <hr />
            <div className="center">
                <ul>
                    <Link to="/admin" style={{ textDecoration: "none" }}>
                        <li className='titleHome'>
                            <HomeIcon className='iconTitle' />
                            <span className='titleHomeText'>Trang chủ</span>
                        </li>
                    </Link>
                    <p className="titleSidebar">
                        <SignalCellularAltIcon className='iconTitle' />Thống kê</p>
                    <Link to="/admin/statistical/topSelling" style={{ textDecoration: "none" }}>
                        <li>
                            <KeyboardDoubleArrowUpIcon className='icon' />
                            <span>Món ăn bán chạy</span>
                        </li>
                    </Link>
                    <Link to="/admin/statistical/revenue" style={{ textDecoration: "none" }}>
                        <li>
                            <PriceChangeIcon className='icon' />
                            <span>Doanh thu</span>
                        </li>
                    </Link>
                    <Link to="/admin/statistical/review" style={{ textDecoration: "none" }}>
                        <li>
                            <ForumIcon className='icon' />
                            <span>Đánh giá</span>
                        </li>
                    </Link>
                    <Link to="/admin/statistical/customerStat" style={{ textDecoration: "none" }}>
                        <li>
                            <PeopleAltIcon className='icon' />
                            <span>Khách hàng</span>
                        </li>
                    </Link>
                    <p className="titleSidebar"><PlaylistAddIcon className='iconTitle' />Quản lý danh mục</p>
                    <Link to="/admin/staffManagement" style={{ textDecoration: "none" }}>
                        <li>
                            <ManageAccountsIcon className='icon' />
                            <span>Quản lý nhân viên</span>
                        </li>
                    </Link>
                    <Link to="/admin/productManagement" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className='icon' />
                            <span>Quản lý món ăn</span>
                        </li>
                    </Link>
                    <Link to="/admin/orderManagement" style={{ textDecoration: "none" }}>
                        <li>
                            <ReceiptLongIcon className='icon' />
                            <span>Quản lý đơn hàng</span>
                        </li>
                    </Link>
                    <Link to="/admin/discountManagement" style={{ textDecoration: "none" }}>
                        <li>
                            <DiscountIcon className='icon' />
                            <span>Quản lý khuyến mãi</span>
                        </li>
                    </Link>
                    <Link to="/admin/customerManagement" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonIcon className='icon' />
                            <span>Quản lý khách hàng</span>
                        </li>
                    </Link>
                    <p className="titleSidebar"><SettingsSuggestIcon className='iconTitle' />Cài đặt</p>
                    <Link to="/admin/setting/changePassword" style={{ textDecoration: "none" }}>
                        <li>
                            <MiscellaneousServicesIcon className='icon' />
                            <span>Đổi mật khẩu</span>
                        </li>
                    </Link>
                    <Link to="/login" style={{ textDecoration: "none" }} onClick={handleLogout}>
                        <li>
                            <ExitToAppIcon className='icon' />
                            <span>Đăng xuất</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar;