import { Navigate } from "react-router-dom";
import { AuthService } from "../services/AuthServices";

export const AdminRoute = (props) => {
    const { children } = { ...props };
    return AuthService.getUserRole() === "admin" ? (
        children
    ) : (
        <Navigate to='/homepage' />
    );
};
