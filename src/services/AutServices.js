import  {BaseApiAccount} from "../assets/api/Api";
import { jwtDecode } from "jwt-decode";

/**
 * 
 * @param {*} token 
 */
const setToken = (token, refreshToken) =>{
    localStorage.setItem('token',token);
    localStorage.setItem('refreshToken', refreshToken)
}

/**
 * 
 * @returns 
 */
const getToken = () => {
    const token = localStorage.getItem('token');
    if(token){
        return token
    }
    return null;
}

const login = async (userdata) => {
    try{
    const responseToken = await BaseApiAccount.post("login", userdata);
    console.log(responseToken?.data?.access_token);
    const token  = responseToken?.data?.access_token;
    const refreshToken  = responseToken?.data?.refresh_token;
    
    const headers = {
        Authorization: `Bearer ${token}`
    };        
    setToken(token, refreshToken);

    const responseData = await BaseApiAccount.get("profile", {headers});
    console.log("ini admin", responseData?.data?.role);

    localStorage.setItem('email',userdata.email);
    localStorage.setItem('password',userdata.password);
    localStorage.setItem('name',responseData?.data?.name)  
    localStorage.setItem('role', responseData?.data?.role);
    return responseData;
    }
    catch(error)
    {
        console.log(error);
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
    if(token){
        const payload = jwtDecode(token);
        const isLogin = Date.now() < payload.exp * 1000;
        console.log(isLogin);
        if(!isLogin){                        
            return refreshToken();
        }
        else{
            return isLogin;
        }
    }
    return null
}

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


export const AuthService = { getToken, setToken, login, getUserRole, getUserEmail, isLoggedIn, getUserName, refreshToken};