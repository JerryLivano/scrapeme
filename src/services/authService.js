
import { jwtDecode } from "jwt-decode";
import api from "../app/api/oldApiSlice";


const setToken = (token, refreshToken) =>{
    localStorage.setItem('token',token);
    localStorage.setItem('refreshToken', refreshToken)
}

const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return token;
    }
    return null;
};

export const login = async (userdata) => {
    try{     
        
        const responseToken = await api.post("auth/login", userdata);
        const token  = responseToken?.data?.access_token;
        const refreshToken  = responseToken?.data?.refresh_token;

        setToken(token, refreshToken);

        const headers = {
            Authorization: `Bearer ${token}`
        };        

        const responseData = await api.get("auth/profile", {headers});
        
        localStorage.setItem('email',userdata.email);
        localStorage.setItem('password',userdata.password);
        localStorage.setItem('name',responseData?.data?.name)  
        localStorage.setItem('role', responseData?.data?.role);
        return responseData;
    }
    catch(error)
    {

        console.log(error.response.data.message);
    }
}



const getUserRole = () => {         
    return localStorage.getItem('role');
}

const getUserEmail = () => {   
    return localStorage.getItem('email');
}

const getUserName = () => {
    return localStorage.getItem('name');
}

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

const refreshToken = async() =>{
    try{
        const refreshToken = localStorage.getItem('refreshToken')        
        return setToken(refreshToken);
    }
    catch(error){
        console.log("error",error)
        return false;
    }
}

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
