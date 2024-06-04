import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { extractRole, getAuthToken } from "../../utils/authUtilities";
import { Role } from "../../utils/roleUtilities";

export default function RequireAuth({ children, permissions }) {
    const [allowed, setAllowed] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = getAuthToken();
        if (!token) {
            navigate("/", { replace: true, state: { from: location } });
            setAllowed(true);
        }
        const role = extractRole(token);
        if (!permissions.includes(role)) {
            if (Object.values(Role).includes(role)) {
                navigate("/home", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
            return;
        }
        setAllowed(true);
    }, [navigate, permissions, location]);
    return allowed ? children : null;
}
