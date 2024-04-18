export const customerMngtColumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: 'firstName', headerName: 'Họ', width: 130 },
    { field: 'lastName', headerName: 'Tên', width: 130 },
    { field: 'phone', headerName: 'Số điện thoại', width: 120 },


    //    {
    //        field: 'fullName',
    //        headerName: 'Full name',
    //        description: 'This column has a value getter and is not sortable.',
    //        sortable: false,
    //        width: 160,
    //        valueGetter: (params) =>
    //            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //     },
    {
        field: "email",
        headerName: "Email",
        width: 160,
    },

    {
        field: "address",
        headerName: "Địa chỉ",
        width: 200,
    },
    {
        field: "status",
        headerName: "Trạng thái",

        width: 150,
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
export const allCustomerMngtRows = [

    {
        id: 1,
        lastName: 'Một',
        firstName: 'Cersei',
        phone: '0354821842',
        status: "Hoạt động",
        email: "1snow@gmail.com",
        address: "Xuân Khánh, Ninh Kiều, Cần Thơ"

    },
    {
        id: 2,
        lastName: 'Hai',
        firstName: 'Nguyen',
        email: "2snow@gmail.com",
        status: "Khóa",

    },
    {
        id: 3,
        lastName: 'Ba',
        firstName: 'Nguyen',
        email: "3snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 4,
        lastName: 'Bốn',
        firstName: 'Nguyen',
        email: "4snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 5,
        lastName: 'Năm',
        firstName: 'Nguyen',
        email: "5snow@gmail.com",
        status: "Khóa",

    },
    {
        id: 6,
        lastName: 'Sáu',
        firstName: 'Nguyen',
        email: "6snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 7,
        lastName: 'Bảy',
        firstName: 'Nguyen',
        email: "7snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 8,
        lastName: 'Tám',
        firstName: 'Nguyen',
        email: "8snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 9,
        lastName: 'Chín',
        firstName: 'Nguyen',
        email: "snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 10,
        lastName: 'Mười',
        firstName: 'Nguyen',
        email: "snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 11,
        lastName: 'Mười một',
        firstName: 'Nguyen',
        email: "snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 12,
        lastName: 'Mười hai',
        firstName: 'Nguyen',
        email: "snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 13,
        lastName: 'Mười ba',
        firstName: 'Nguyen',
        email: "snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 14,
        lastName: 'Mười bốn',
        firstName: 'Nguyen',
        email: "snow@gmail.com",
        status: "Hoạt động",

    },
];
export const blockCustomerMngtRows = [


    {
        id: 2,
        lastName: 'Hai',
        firstName: 'Nguyen',
        email: "2snow@gmail.com",
        status: "Khóa",

    },

    {
        id: 5,
        lastName: 'Năm',
        firstName: 'Nguyen',
        email: "5snow@gmail.com",
        status: "Khóa",

    },
];
export const activeCustomerMngtRows = [

    {
        id: 1,
        lastName: 'Một',
        firstName: 'Cersei',
        phone: '0354821842',
        status: "Hoạt động",
        email: "1snow@gmail.com",
        address: "Xuân Khánh, Ninh Kiều, Cần Thơ"

    },

    {
        id: 3,
        lastName: 'Ba',
        firstName: 'Nguyen',
        email: "3snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 4,
        lastName: 'Bốn',
        firstName: 'Nguyen',
        email: "4snow@gmail.com",
        status: "Hoạt động",

    },

];