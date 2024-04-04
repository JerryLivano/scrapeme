import { useEffect, useRef, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logOut, selectCurrentToken, selectIsLoggedIn } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";

const RefreshAuth = () => {
    const token = useSelector(selectCurrentToken);
    const loggedIn = useSelector(selectIsLoggedIn);
    const isLoggedIn = Cookies.get("isLoggedIn");
    const dispatch = useDispatch();
    const effectRan = useRef(false);
    const location = useLocation();
    const [trueSuccess, setTrueSuccess] = useState(false);
    const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
        useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || import.meta.env.PROD) {
            // React 18 Strict Mode
            if (isLoggedIn === undefined) {
                dispatch(logOut());
                Cookies.remove("isLoggedIn");
            }
            const verifyRefreshToken = async () => {
                // console.log('verifying refresh token')
                try {
                    //const response =
                    await refresh();
                    //const { accessToken } = response.data
                    setTrueSuccess(true);
                } catch (err) {
                    console.log(err);
                }
            };

            if (!token) verifyRefreshToken();
        }

        return () => (effectRan.current = true);
    }, [dispatch, isLoggedIn, refresh, token]);

    let content;
    if (isError && isLoggedIn) {
        Cookies.remove("isLoggedIn");
    } else if (token) {
        // console.log('no persist')
        content = <Outlet />;
    } else if (isLoading) {
        console.log("loading");
    } else if (isError) {
        const sessionEnded = isLoggedIn === undefined && loggedIn;
        content = (
            <Navigate
                to='/login'
                state={{ from: location, sessionEnded }}
                replace={true}
            />
        );
    } else if (isSuccess && trueSuccess) {
        // console.log('success')
        content = <Outlet />;
    } else if (token && isUninitialized) {
        // console.log('token and uninit')
        // console.log(isUninitialized)
        content = <Outlet />;
    }

    return content;
};
export default RefreshAuth;
