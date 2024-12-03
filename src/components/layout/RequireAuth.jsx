import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    extractRole,
    getAuthToken,
    removeAuthToken,
} from "../../utils/authUtilities";
import Spinner from "../common/Public/Spinner";

export default function RequireAuth({ children, permissions }) {
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = getAuthToken();
        if (!token) {
            navigate("/", { replace: true, state: { from: location } });
            setLoading(false);
            return;
        }
        const role = extractRole(token);
        if (!permissions.includes(role)) {
            navigate("/", { replace: true, state: { from: location } });
            removeAuthToken();
            setLoading(false);
            return;
        }
        setAllowed(true);
        setLoading(false);
    }, [navigate, permissions, location]);

    if (loading) {
        return <Spinner />;
    }

    return allowed ? children : null;
}
