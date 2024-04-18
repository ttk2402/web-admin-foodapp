//import { useEffect, useState } from "react";


export const productMngtColumns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "name",
        headerName: "Tên",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.url_image_product} alt="avatar" />
                    {params.row.name}
                </div>
            );
        },
    },
    // { field: 'productName', headerName: 'Tên', width: 180 },
    { field: 'price', headerName: 'Giá', width: 100 },

    // {
    //     field: "category",
    //     headerName: "Phân loại",
    //     width: 150,
    // },
    {
        field: "description",
        headerName: "Mô tả",
        width: 250,
    },

    {
        field: "status",
        headerName: "Trạng thái",
        width: 120,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            );
        },
    },
];


export const allProductMngtRows = [




    // //temporary data
    // const [data, setData] = useState([]);
    // const response = await fetch("https://aba0-113-161-208-210.ngrok-free.app/api/product/");
    // //             const result = await response.json();
    // export const allProductMngtRows = [
    //     useEffect(() => {
    //         const fetchData = async () => {
    //             try {
    //                 // Replace the URL below with the actual API endpoint you want to call
    //                 const response = await fetch("https://aba0-113-161-208-210.ngrok-free.app/api/product/");
    //                 const result = await response.json();
    //                 setData(result);
    //                 console.log("hhhhhhhhhh");
    //             } catch (error) {
    //                 console.error("Error fetching data:", error);
    //             }

    //         };

    //         fetchData();
    //     }, [])

    // {
    //     "id": 1,
    //     "name": "MIẾNG GÀ GIÒN",
    //     "price": 33000.0,
    //     "description": "",
    //     "url_image_product": "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/1/_/1_mi_ng_ggvv_png_1.png"
    // },
    // {
    //     "id": 2,
    //     "name": "MÌ Ý SỐT BÒ BẰM",
    //     "price": 35000.0,
    //     "description": "",
    //     "url_image_product": "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m__3.png"
    // },
    // {
    //     "id": 3,
    //     "name": "KHOAI TÂY CHIÊN ",
    //     "price": 20000.0,
    //     "description": "",
    //     "url_image_product": "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/5/5/5532107fb902fd-1860001_khoaivua21.png"
    // }
];

//     {
//         id: 1,
//         productName: 'Kem Socola',
//         imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/c/4/c400652c2a03e0-chocolateicecream01.png",
//         productPrice: "7000",
//         category: "Tráng miệng",
//         discription: "Vị socola",
//         status: "Đang bán",

//     },
//     {
//         id: 2,
//         productName: 'Bánh xoài đào',
//         imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/p/m/pmp-plated.png",
//         productPrice: "10000",
//         category: "Tráng miệng",
//         discription: "Làm từ bột mì có hương vị xoài",
//         status: "Đang bán",
//     },
//     {
//         id: 3,
//         productName: '7 UP',
//         imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/7/6/76632fe162df44-1.png",
//         productPrice: "12000",
//         category: "Thức uống",
//         discription: "Ly vừa",
//         status: "Đang bán",

//     },
//     {
//         id: 4,
//         productName: 'Mì ý sốt bò bằm',
//         imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m__2.png",
//         productPrice: "45000",
//         category: "Món ăn",
//         discription: "Lớn",
//         status: "Đang bán",

//     },
//     {
//         id: 5,
//         productName: 'Cơm trắng',
//         imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/b/3/b3ad51b912e4e5-2mienggaran24.png",
//         productPrice: "10000",
//         category: "Phần ăn phụ",
//         discription: "1 chén",
//         status: "Đang bán",

//     },
//     {
//         id: 6,
//         productName: 'Khoai tây chiên',
//         imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/5/5/5532107fb902fd-1860001_khoaivua21.png",
//         productPrice: "20000",
//         category: "Phần ăn phụ",
//         discription: "Vừa",
//         status: "Đã ẩn",

//     },

// ];

export const activeProductMngtRows = [

    {
        id: 1,
        productName: 'Kem Socola',
        imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/c/4/c400652c2a03e0-chocolateicecream01.png",
        productPrice: "7000",
        category: "Tráng miệng",
        discription: "Vị socola",
        status: "Đang bán",

    },
    {
        id: 2,
        productName: 'Bánh xoài đào',
        imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/p/m/pmp-plated.png",
        productPrice: "10000",
        category: "Tráng miệng",
        discription: "Làm từ bột mì có hương vị xoài",
        status: "Đang bán",
    },
    {
        id: 3,
        productName: '7 UP',
        imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/7/6/76632fe162df44-1.png",
        productPrice: "12000",
        category: "Thức uống",
        discription: "Ly vừa",
        status: "Đang bán",

    },
    {
        id: 4,
        productName: 'Mì ý sốt bò bằm',
        imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m__2.png",
        productPrice: "45000",
        category: "Món ăn",
        discription: "Lớn",
        status: "Đang bán",

    },
    {
        id: 5,
        productName: 'Cơm trắng',
        imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/b/3/b3ad51b912e4e5-2mienggaran24.png",
        productPrice: "10000",
        category: "Phần ăn phụ",
        discription: "1 chén",
        status: "Đang bán",

    },

];

export const hiddenProductMngtRows = [
    {
        id: 6,
        productName: 'Khoai tây chiên',
        imgLink: "https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/5/5/5532107fb902fd-1860001_khoaivua21.png",
        productPrice: "20000",
        category: "Phần ăn phụ",
        discription: "Vừa",
        status: "Đã ẩn",

    },

];