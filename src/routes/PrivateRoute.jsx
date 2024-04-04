import { Navigate } from "react-router-dom"
import {AuthService} from "../services/AutServices"

export const PrivateRoute =(props) =>{
        const {children} = {...props}
        return AuthService.isLoggedIn()? children : <Navigate to="/login" />
}

