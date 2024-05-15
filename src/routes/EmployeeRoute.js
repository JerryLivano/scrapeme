import { Navigate } from "react-router-dom"
import {AuthService} from "../services/AutServices"

export const employeeRoute = (children) => {
    return (AuthService.getUserRole() === 'Employee') ? children : <Navigate to="/home" /> 
}

