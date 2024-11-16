import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { extractRole, getAuthToken, removeAuthToken } from "../../utils/authUtilities";

export default function RequireAuth({ children, permissions }) {
    const [allowed, setAllowed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = getAuthToken();
        if (!token) {
            navigate("/", { replace: true, state: { from: location } });
            return;
        }
        const role = extractRole(token);
        if (!permissions.includes(role)) {
            navigate("/", { replace: true, state: { from: location } });
            removeAuthToken();
            return;
        }
        setAllowed(true);
    }, [navigate, permissions, location]);

    return allowed ? children : null;
}
