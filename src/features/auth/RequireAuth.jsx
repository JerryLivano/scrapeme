import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { role } = useAuth()
    const arr = [role.name]

    const content = (
        arr.some(val => allowedRoles.includes(val))
            ?
            < Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth