import { setCookie, getCookie } from "react-use-cookie";

export const setAuthToken = (token) => {
    const tokenEpochTimeStamp = extractExpiredTime(token);
    const currentEpochTimeStamp = Math.floor(Date.now() / 1000);
    setCookie("ScrapeToken", token, {
        days: (tokenEpochTimeStamp - currentEpochTimeStamp) / 86400,
    });
};

export const removeAuthToken = () => {
    setCookie("ScrapeToken", "", { days: 0 });
};

export const getAuthToken = () => {
    return getCookie("ScrapeToken");
};

const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(atob(base64));
}

export const extractGuid = (token) => {
    const decodedToken = decodeToken(token);
    return decodedToken.guid;
}

export const extractName = (token) => {
    const decodedToken = decodeToken(token);
    return decodedToken.name;
};

export const extractRole = (token) => {
    const decodedToken = decodeToken(token);
    return decodedToken.role;
};

export const extractExpiredTime = (token) => {
    const decodedToken = decodeToken(token);
    return decodedToken.exp;
};