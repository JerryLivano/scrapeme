import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    extractExpiredTime,
    extractRole,
    getAuthToken,
    removeAuthToken,
} from "../../utils/authUtilities";
import Spinner from "../common/Public/Spinner";
import { toastError } from "../common/Public/Toast";

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
        try {
            const role = extractRole(token);
            if (!permissions.includes(role)) {
                toastError({ message: "You don't have permission!" });
                navigate("/", { replace: true, state: { from: location } });
                removeAuthToken();
                setLoading(false);
                return;
            }
            const expiredTime = extractExpiredTime(token);
            const currentTime = Math.floor(Date.now() / 1000);
            if (expiredTime <= currentTime) {
                toastError({ message: "Your session has expired!" });
                removeAuthToken();
                navigate("/", { replace: true, state: { from: location } });
                setLoading(false);
                return;
            }
            setAllowed(true);
        } catch (err) {
            console.error("Authentication error:", err.message);
            removeAuthToken();
            navigate("/", { replace: true, state: { from: location } });
        } finally {
            setLoading(false);
        }
    }, [navigate, permissions, location]);

    if (loading) {
        return <Spinner />;
    }

    return allowed ? children : null;
}
