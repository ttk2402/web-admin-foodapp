

export const orderMngtColumns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: 'orderDate', headerName: 'Ngày mua', width: 100 },
    { field: 'total', headerName: 'Tổng tiền', width: 100 },
    { field: 'note', headerName: 'Ghi chú', width: 150 },
    { field: 'paymentType', headerName: 'Hình thức thanh toán', width: 150 },

    // {
    //     field: "staff",
    //     headerName: "Nhân viên",
    //     width: 80,
    // },

    // {
    //     field: "address",
    //     headerName: "Địa chỉ",
    //     width: 100,
    // },
    {
        field: "discount",
        headerName: "Khuyến mãi",
        width: 120,
    },

    {
        field: "phonenumber",
        headerName: "Số điện thoại KH",
        width: 120,
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

//temporary data
export const allOrderMngtRows = [

    {
        id: 1,
        code: 'Khuyến mãi mới',
        percentage: "5%",
        dateOfStart: "02/22/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng cho các món ăn mới",
        status: "Chờ duyệt",

    },
    {
        id: 2,
        code: 'Khuyến mãi mới',
        percentage: "5%",
        dateOfStart: "02/22/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng cho các món ăn mới",
        status: "Chờ duyệt",

    },
    {
        id: 3,
        code: 'Khuyến mãi hàng tuần',
        percentage: '3%',
        dateOfStart: "02/01/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng mỗi thứ tư hàng tuần trong tháng",
        status: "Đang giao",

    },
    {
        id: 4,
        code: 'Khuyến mãi đặc biệt',
        percentage: '10%',
        dateOfStart: "02/12/24",
        dataOfEnd: "02/18/24",
        type: "",
        discription: "Khuyến mãi áp dụng cho 100 khách hàng đầu tiên",
        status: "Hủy",

    },
    {
        id: 5,
        code: 'Khuyến mãi đặc biệt',
        percentage: '10%',
        dateOfStart: "02/12/24",
        dataOfEnd: "02/18/24",
        type: "",
        discription: "Khuyến mãi áp dụng cho 100 khách hàng đầu tiên",
        status: "Hủy",

    },
    {
        id: 6,
        code: 'Khuyến mãi tháng 2',
        percentage: '5%',
        dateOfStart: "02/01/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng đến khi hết mã",
        status: "Đã giao",

    },

];

export const processingOrderMngtRows = [

    {
        id: 1,
        code: 'Khuyến mãi mới',
        percentage: '5%',
        dateOfStart: "02/22/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng cho các món ăn mới",
        status: "Chờ duyệt",

    },
    {
        id: 2,
        code: 'Khuyến mãi hàng tuần',
        percentage: '3%',
        dateOfStart: "02/01/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng mỗi thứ tư hàng tuần trong tháng",
        status: "Chờ duyệt",

    },


];

export const approvedOrderMngtRows = [

    {
        id: 3,
        code: 'Khuyến mãi tháng 2',
        percentage: '5%',
        dateOfStart: "02/01/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng đến khi hết mã",
        status: "Đang giao",

    },

];

export const cancelOrderMngtRows = [

    {
        id: 4,
        code: 'Khuyến mãi đặc biệt',
        percentage: '10%',
        dateOfStart: "02/12/24",
        dataOfEnd: "02/18/24",
        type: "",
        discription: "Khuyến mãi áp dụng cho 100 khách hàng đầu tiên",
        status: "Hủy",

    },
    {
        id: 5,
        code: 'Khuyến mãi đặc biệt',
        percentage: '10%',
        dateOfStart: "02/12/24",
        dataOfEnd: "02/18/24",
        type: "",
        discription: "Khuyến mãi áp dụng cho 100 khách hàng đầu tiên",
        status: "Hủy",

    },
];

export const completeOrderMngtRows = [

    {
        id: 6,
        code: 'Khuyến mãi tháng 2',
        percentage: '5%',
        dateOfStart: "02/01/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng đến khi hết mã",
        status: "Đã giao",

    },

];