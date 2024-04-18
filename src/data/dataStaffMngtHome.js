export const staffMngtColumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: 'useName', headerName: 'Tên tài khoản', width: 150 },
    { field: 'firstName', headerName: 'Họ', width: 150 },
    { field: 'lastName', headerName: 'Tên', width: 150 },

    { field: 'phone', headerName: 'Số điện thoại', width: 180 },


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
        field: "status",
        headerName: "Trạng thái",
        width: 200,
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
export const allStaffMngtRows = [

    {
        id: 1,
        lastName: 'Một',
        firstName: 'Cersei',
        useName: "NV1",
        phone: '0354821842',
        status: "Hoạt động",
        // email: "1snow@gmail.com",
        // address: "Xuân Khánh, Ninh Kiều, Cần Thơ"

    },
    {
        id: 2,
        lastName: 'Hai',
        firstName: 'Nguyen',
        useName: "NV2",
        // email: "2snow@gmail.com",
        status: "Khóa",

    },
    {
        id: 3,
        lastName: 'Ba',
        firstName: 'Nguyen',
        useName: "NV3",
        // email: "3snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 4,
        lastName: 'Bốn',
        firstName: 'Nguyen',
        useName: "NV4",
        // email: "4snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 5,
        lastName: 'Năm',
        firstName: 'Nguyen',
        useName: "NV5",
        // email: "5snow@gmail.com",
        status: "Khóa",

    },
    {
        id: 6,
        lastName: 'Sáu',
        firstName: 'Nguyen',
        useName: "NV6",
        status: "Hoạt động",

    },
    {
        id: 7,
        lastName: 'Bảy',
        firstName: 'Nguyen',
        useName: "NV7",
        status: "Hoạt động",

    },
    {
        id: 8,
        lastName: 'Tám',
        firstName: 'Nguyen',
        useName: "NV8",
        status: "Hoạt động",

    },
    {
        id: 9,
        lastName: 'Chín',
        firstName: 'Nguyen',
        useName: "NV9",
        status: "Hoạt động",

    },
    {
        id: 10,
        lastName: 'Mười',
        firstName: 'Nguyen',
        useName: "NV10",
        status: "Hoạt động",

    },
    {
        id: 11,
        lastName: 'Mười một',
        firstName: 'Nguyen',
        useName: "NV11",
        status: "Hoạt động",

    },
    {
        id: 12,
        lastName: 'Mười hai',
        firstName: 'Nguyen',
        useName: "NV12",
        status: "Hoạt động",

    },
    {
        id: 13,
        lastName: 'Mười ba',
        firstName: 'Nguyen',
        useName: "NV13",
        status: "Hoạt động",

    },
    {
        id: 14,
        lastName: 'Mười bốn',
        firstName: 'Nguyen',
        useName: "NV14",
        status: "Hoạt động",

    },
];


export const blockStaffMngtRows = [

    {
        id: 2,
        lastName: 'Hai',
        firstName: 'Nguyen',
        useName: "NV2",
        // email: "2snow@gmail.com",
        status: "Khóa",

    },

    {
        id: 5,
        lastName: 'Năm',
        firstName: 'Nguyen',
        useName: "NV5",
        // email: "5snow@gmail.com",
        status: "Khóa",
    },
];

export const activeStaffMngtRows = [

    {
        id: 1,
        lastName: 'Một',
        firstName: 'Cersei',
        useName: "NV1",
        phone: '0354821842',
        status: "Hoạt động",
        // email: "1snow@gmail.com",
        // address: "Xuân Khánh, Ninh Kiều, Cần Thơ"

    },

    {
        id: 3,
        lastName: 'Ba',
        firstName: 'Nguyen',
        useName: "NV3",
        // email: "3snow@gmail.com",
        status: "Hoạt động",

    },
    {
        id: 4,
        lastName: 'Bốn',
        firstName: 'Nguyen',
        useName: "NV4",
        // email: "4snow@gmail.com",
        status: "Hoạt động",

    },

];