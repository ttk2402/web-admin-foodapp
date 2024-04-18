// StaffManagementRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffMngHome from './pages/staffManagement/StaffMngtHome';
import StaffDetail from './pages/staffManagement/StaffDetail';
import AddStaff from './pages/staffManagement/AddStaff';
import EditStaff from './pages/staffManagement/EditStaff';

const StaffManagementRoutes = () => {
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

export default StaffManagementRoutes;
