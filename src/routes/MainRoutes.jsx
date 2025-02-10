import { Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from '../pages/SignInPage/SignInPage';
import { useAuth } from "../context/AuthContext";
import Pagenotfound from '../pages/Pagenotfound/Pagenotfound';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';

function MainRoutes() {

    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignInPage />} />

            {/* Protected Route */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/movie/:id"
                element={
                    <ProtectedRoute>
                        <MovieDetailsPage />
                    </ProtectedRoute>
                }
            />

            <Route path='*' element={<Pagenotfound />} />
        </Routes>
    )
}

export default MainRoutes;




