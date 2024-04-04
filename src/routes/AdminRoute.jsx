import { Navigate } from "react-router-dom"
import {AuthService} from "../services/AutServices"

export const AdminRoute = (props) => {
    const{children} = {...props}
    return (AuthService.getUserRole() === "admin")? children : <Navigate to="/dashboard" />
}

