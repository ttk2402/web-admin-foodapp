

export const discountMngtColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: 'code', headerName: 'Tên', width: 180 },
    { field: 'percentage', headerName: 'Giá trị', width: 80 },
    { field: 'dateOfStart', headerName: 'Ngày bắt đầu', width: 110 },

    { field: 'dataOfEnd', headerName: 'Ngày kết thúc', width: 110 },



    {
        field: "type",
        headerName: "Loại",
        width: 80,
    },

    {
        field: "discription",
        headerName: "Mô tả",
        width: 170,
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
export const allDiscountMngtRows = [
    {
        id: 1,
        code: 'Khuyến mãi mới',
        percentage: "5%",
        dateOfStart: "02/22/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng cho các món ăn mới",
        status: "Hoạt động",
    },
    {
        id: 2,
        code: 'Khuyến mãi hàng tuần',
        percentage: '3%',
        dateOfStart: "02/01/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng mỗi thứ tư hàng tuần trong tháng",
        status: "Hoạt động",
    },
    {
        id: 3,
        code: 'Khuyến mãi đặc biệt',
        percentage: '10%',
        dateOfStart: "02/12/24",
        dataOfEnd: "02/18/24",
        type: "",
        discription: "Khuyến mãi áp dụng cho 100 khách hàng đầu tiên",
        status: "Hết hạn",
    },
    {
        id: 4,
        code: 'Khuyến mãi tháng 2',
        percentage: '5%',
        dateOfStart: "02/01/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng đến khi hết mã",
        status: "Lưu kho",
    },
];

export const activeDiscountMngtRows = [
    {
        id: 1,
        code: 'Khuyến mãi mới',
        percentage: '5%',
        dateOfStart: "02/22/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng cho các món ăn mới",
        status: "Hoạt động",
    },
    {
        id: 2,
        code: 'Khuyến mãi hàng tuần',
        percentage: '3%',
        dateOfStart: "02/01/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng mỗi thứ tư hàng tuần trong tháng",
        status: "Hoạt động",
    },
];

export const storageDiscountMngtRows = [
    {
        id: 4,
        code: 'Khuyến mãi tháng 2',
        percentage: '5%',
        dateOfStart: "02/01/24",
        dataOfEnd: "02/29/24",
        type: "",
        discription: "Khuyến mãi áp dụng đến khi hết mã",
        status: "Lưu kho",
    },
];
export const expiredDiscountMngtRows = [
    {
        id: 3,
        code: 'Khuyến mãi đặc biệt',
        percentage: '10%',
        dateOfStart: "02/12/24",
        dataOfEnd: "02/18/24",
        type: "",
        discription: "Khuyến mãi áp dụng cho 100 khách hàng đầu tiên",
        status: "Hết hạn",

    },
];