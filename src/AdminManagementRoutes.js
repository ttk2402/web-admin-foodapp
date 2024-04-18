// StaffManagementRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffMngHome from './pages/staffManagement/StaffMngtHome';
import StaffDetail from './pages/staffManagement/StaffDetail';
import AddStaff from './pages/staffManagement/AddStaff';
import EditStaff from './pages/staffManagement/EditStaff';

const AdminManagementRoutes = () => {
    return (
        <Routes>
            <Route index element={<StaffMngHome />} />
            <Route path="staffDetail/:staffId" element={<StaffDetail />} />
            <Route path="addStaff" element={<AddStaff />} />
            <Route path="editStaff/:staffId" element={<EditStaff />} />
            {/* Add other staff management routes here */}
        </Routes>
    );
};

export default AdminManagementRoutes;


// // App.js
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// //import PrivateRoute from './PrivateRoute'; // Import PrivateRoute từ file PrivateRoute.js
// import Login from './pages/login/Login';
// //import Home from './pages/home/Home';
// import AdminRoutes from './AdminManagementRoutes'; // Import AdminRoutes
// import StaffManagementRoutes from './StaffManagementRoutes'; // Import StaffManagementRoutes
// import PrivateRoute from './PrivateRoute.js';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <PrivateRoute path="/admin/*" role="admin" status="active" element={<AdminRoutes />} />
//         <PrivateRoute path="/staff/*" role="staff" status="active" element={<StaffManagementRoutes />} />
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
