
import "../../css/mngtHome.css"
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import AllTableProductMngt from "../../components/tableProductMngtHome/AllTableProductMngt";
//import HiddenTableProductMngt from "../../components/tableProductMngtHome/HiddenTableProductMngt ";
import TabContent from "../../components/tab-content/tab-content";
import { Link } from "react-router-dom";
import AllTableCategoryProductMngt from "../../components/tableProductMngtHome/AllTableCategoryProductMngt";

//import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


const ProductMngtHome = () => {
    // useEffect(() => {

    //     add();
    // }, []);
    // const add = () => {
    //     axios.get(`http://localhost:8080/api/product/1`).then(resp => {
    //         console.log(resp);
    //     })
    // }


    // const [showModal, setShowModal] = useState(false);

    // const openModal = () => {
    //     setShowModal(true);
    // };

    // const closeModal = () => {
    //     setShowModal(false);
    // };
    const contents = [
        {
            title: "Tất cả Món ăn",
            content: (
                <AllTableProductMngt />
            ),
        },
        {
            title: "Tất cả danh mục",
            content: (
                <AllTableCategoryProductMngt />
            ),
        },

        // {
        //     title: "Món ăn đã ẩn",
        //     content: (
        //         <HiddenTableProductMngt />
        //     ),
        // },
    ];
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar title="Quản lý món ăn" />
                <div className="headerMngt">
                    {/* <div className="search">
                        <input type="text" placeholder="Search..." />
                        <div className='icon'>
                            <SearchOutlinedIcon />
                        </div>
                    </div> */}

                    {/* <div className="linkAdd"> */}
                    {/* <button className="textAdd" onClick={openModal}>Thêm danh mục</button>
                        {showModal && (
                            <div className="modal-background" onClick={closeModal}>
                                <div className="modal" onClick={(e) => e.stopPropagation()}>
                                    
                                    <span className="close" onClick={closeModal}>
                                        &times;
                                    </span>
                                    <div className="modal-content">
                                        <p>Nội dung của Modal ở đây</p>
                                    </div>
                                </div>
                            </div>
                        )} */}
                    {/* <Link to="/productManagement/addCategory" style={{ textDecoration: "none" }}>
                            <div className="textAdd">Thêm danh mục</div>
                        </Link>
                    </div> */}
                    <div className="linkAdd">
                        <Link to="/admin/productManagement/addProduct" style={{ textDecoration: "none" }}>
                            <div className="textAdd">Thêm mới</div>
                        </Link>
                    </div>
                </div>

                <TabContent input={contents} />

                {/* <div className="linkAdd">

                    <div onClick={add}>add</div>

                </div> */}
            </div>


        </div>

    )
}

export default ProductMngtHome