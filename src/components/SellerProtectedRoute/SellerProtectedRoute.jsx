// src/components/SellerProtectedRoute.js
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const SellerProtectedRoute = () => {
    const { user, userType, loading } = useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    return user && userType === "seller" ? <Outlet /> : <Navigate to="/login" />;
};

export default SellerProtectedRoute;
