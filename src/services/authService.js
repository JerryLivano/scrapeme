
import { jwtDecode } from "jwt-decode";
import api from "../app/api/apiSlice";

const setToken = (token) => {
    localStorage.setItem("token", token);
};

const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return token;
    }
    return null;
};

const login = (userdata) => {
    const response = api.post("login", userdata);
    localStorage.setItem("email", userdata.email);
    localStorage.setItem("password", userdata.password);
    return api.post("login", userdata);
};

const getUserRole = () => {
    const token = getToken();
    const roleType =
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    if (token) {
        const payload = jwtDecode(token);
        console.log(payload[roleType]);
        isLoggedIn();
        return payload[roleType];
    }
    return null;
};

const getUserEmail = () => {
    const token = getToken();
    const emailType =
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
    if (token) {
        const payload = jwtDecode(token);
        return payload[emailType];
    }
    return null;
};

const getUserName = () => {
    const token = getToken();
    const username =
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
    if (token) {
        const payload = jwtDecode(token);
        return payload[username];
    }
    return null;
};

const isLoggedIn = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        const isLogin = Date.now() < payload.exp * 1000;
        console.log(isLogin);
        if (!isLogin) {
            return refreshToken();
        } else {
            return isLogin;
        }
    }
    return null;
};

const refreshToken = async () => {
    try {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        const userdata = { email, password };
        const response = await login(userdata);
        console.log(response.data);
        console.log(response.data.data);
        setToken(response.data.data);
        return true;
    } catch (error) {
        console.log("error", error);
        return false;
    }
};

export const AuthService = {
    getToken,
    setToken,
    login,
    getUserRole,
    getUserEmail,
    isLoggedIn,
    getUserName,
    refreshToken,
};
