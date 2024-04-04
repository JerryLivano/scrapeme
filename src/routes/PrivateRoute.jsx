import { Navigate } from "react-router-dom";
import { AuthService } from "../services/AuthServices";

export const PrivateRoute = (props) => {
    const { children } = { ...props };
    return AuthService.isLoggedIn() ? children : <Navigate to='/login' />;
};
