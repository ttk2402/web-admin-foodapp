import "./widget.css";
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ForumIcon from '@mui/icons-material/Forum';
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
//Đã check
const Widget = ({ type }) => {
    let data;
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let apiUrl = '';
                switch (type) {
                    case "product":
                        apiUrl = "http://localhost:8080/api/product/"; // Địa chỉ API để lấy tất cả sản phẩm
                        break;
                    case "order":
                        apiUrl = "http://localhost:8080/api/order/all"; // Địa chỉ API để lấy số lượng đơn hàng
                        break;
                    case "discount":
                        apiUrl = "http://localhost:8080/api/discount/all"; // Địa chỉ API để lấy số lượng đánh giá
                        break;
                    case "user":
                        apiUrl = "http://localhost:8080/api/account/1"; // Địa chỉ API để lấy số lượng khách hàng
                        break;
                    case "review":
                        apiUrl = "http://localhost:8080/api/review/all"; // Địa chỉ API để lấy số lượng đánh giá
                        break;
                    default:
                        break;
                }
                const response = await axios.get(apiUrl);
                setAmount(response.data.length); // Đếm số lượng từ dữ liệu nhận được
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [type]);
    switch (type) {
        case "product":
            data = {
                title: "MÓN ĂN",
                isMoney: false,
                text: "Xem tất cả món ăn",
                link: "/admin/productManagement",
                icon: <StoreIcon className="icon" />,
            };
            break;
        case "order":
            data = {
                title: "ĐƠN HÀNG",
                isMoney: false,
                text: "Xem tất cả đơn hàng",
                link: "/admin/orderManagement",
                icon: <ReceiptLongIcon className="icon" />,
            };
            break;
        case "discount":
            data = {
                title: "KHUYẾN MÃI",
                isMoney: false,
                text: "Xem tất cả khuyến mãi",
                link: "/admin/discountManagement",
                icon: <ForumIcon className="icon" />,
            };
            break;
        case "user":
            data = {
                title: "KHÁCH HÀNG",
                isMoney: false,
                text: "Xem tất cả khách hàng",
                link: "/admin/customerManagement",
                icon: <PersonIcon className="icon" />,
            };
            break;
        case "review":
            data = {
                title: "ĐÁNH GIÁ",
                isMoney: false,
                text: "Xem tất cả đánh giá",
                link: "/admin/statistical/review",
                icon: <PersonIcon className="icon" />,
            };
            break;
        default:
            break;
    }
    return (
        <div className="widget">
            <div className="left">
                <span className="titlehome">{data.title}</span>
                <span className="counter">{data.isMoney && "$"} {amount}</span>
                {/* <span className="link">{data.link}</span> */}
                <Link to={data.link} className="link">{data.text}</Link>
            </div>
        </div>
    )
}
export default Widget;