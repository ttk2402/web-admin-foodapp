
import "../../css/mngtHome.css"
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from "react-router-dom";

import TabContent from "../../components/tab-content/tab-content";
import AllTableStaffMngt from "../../components/tableStaffMngtHome/AllTableStaffMngt";
import ActiveTableStaffMngt from "../../components/tableStaffMngtHome/ActiveTableStaffMngt";
import BlockTableStaffMngt from "../../components/tableStaffMngtHome/BlockTableStaffMngt";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
const StaffMngHome = () => {


    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/account/2');
    //         return response;
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         throw error;
    //     }
    // };

    // useEffect(() => {
    //     // Fetch data when component mounts
    //     fetchData();
    // }, []); // Chỉ gọi một lần khi component mount
    // const [activeTab, setActiveTab] = useState(0);

    // // Function to fetch data based on activeTab
    // const fetchData = async (tabIndex) => {
    //     try {
    //         switch (tabIndex) {
    //             case 0:
    //                 const response = await axios.get('http://localhost:8080/api/account/2');
    //                 // Fetch data for "Tất cả nhân viên"
    //                 console.log("Fetching data for Tất cả nhân viên");
    //                 break;
    //             case 1:

    //                 // Fetch data for "Tài khoản hoạt động"
    //                 console.log("Fetching data for Tài khoản hoạt động");
    //                 break;
    //             case 2:
    //                 // Fetch data for "Tài khoản đã khóa"
    //                 console.log("Fetching data for Tài khoản đã khóa");
    //                 break;
    //             default:
    //                 break;
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    // // Function to handle tab change
    // const handleTabChange = (index) => {
    //     setActiveTab(index);
    //     fetchData(index); // Fetch data when tab changes
    // };


    const contents = [
        {
            title: "Tất cả nhân viên",
            content: (
                <AllTableStaffMngt />//Data={fetchData}
            ),
        },
        {
            title: "Tài khoản hoạt động",
            content: (
                <ActiveTableStaffMngt />
            ),
        },
        {
            title: "Tài khoản đã khóa",
            content: (
                <BlockTableStaffMngt />
            ),
        },

    ];

    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar title="Quản lý nhân viên" />
                <div className="headerMngt">
                    {/* <div className="search">
                        <input type="text" placeholder="Search..." />
                        <div className='icon'>
                            <SearchOutlinedIcon />
                        </div>
                    </div> */}
                    <div className="linkAdd">
                        <Link to="/admin/staffManagement/addStaff" style={{ textDecoration: "none" }}>
                            <div className="textAdd">Thêm nhân viên</div>
                        </Link>
                    </div>
                </div>
                <TabContent input={contents} />
                {/* fetchData={fetchData} */}
                {/* <TabContent input={contents} onTabChange={handleTabChange} /> */}
            </div>
        </div>
    )
}

export default StaffMngHome