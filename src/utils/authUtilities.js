import { setCookie, getCookie } from "react-use-cookie";

export const setAuthToken = (token) => {
    const tokenEpochTimeStamp = extractExpiredTime(token);
    const currentEpochTimeStamp = Math.floor(Date.now() / 1000);
    setCookie("PortalToken", token, {
        days: (tokenEpochTimeStamp - currentEpochTimeStamp) / 86400,
    });
};

export const removeAuthToken = () => {
    setCookie("PortalToken", "", { days: 0 });
}

export const getAuthToken = () => {
    return getCookie("PortalToken");
}

const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(atob(base64));
};

export const extractExpiredTime = (token) => {
    return decodeToken(token).exp;
};

export const extractName = (token) => {
    return decodeToken(token).name;
};

export const extractRole = (token) => {
    return decodeToken(token).role;
};

export const extractId = (token) => {
    return decodeToken(token).id;
}

export const extractProfilePicture = (token) => {
    return decodeToken(token).profilePicture;
};