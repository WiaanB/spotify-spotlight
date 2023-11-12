import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth';

export interface User {
    id: string;
    display_name: string;
    country: string;
    product: string;
}

const ProtectedRoute: React.FC = () => {
    const user = useAuth();

    return user.display_name ? <Outlet />: <Navigate to="/login" />
}

export default ProtectedRoute;