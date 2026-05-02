import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import ClassifierWrapper from './Components/Classifiers/ClassifierWrapper';
import UserWrapper from './Components/Users/UserWrapper';
import { AuthService } from './Services';

const RequireRole = ({ roles, children }) => {
    if (!AuthService.CanAccess(roles)) {
        return <Navigate to="/otsi/viisid" replace />;
    }
    return children;
};

const HaldaRouter = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/halda/klassifikaatorid" replace />} />
        <Route
            path="/klassifikaatorid/*"
            element={
                <RequireRole roles={['editor', 'admin']}>
                    <ClassifierWrapper />
                </RequireRole>
            }
        />
        <Route
            path="/kasutajad/*"
            element={
                <RequireRole roles={['admin']}>
                    <UserWrapper />
                </RequireRole>
            }
        />
    </Routes>
);

export default HaldaRouter;
