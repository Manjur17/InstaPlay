import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    // If user is not authenticated, redirect to signin page
    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
