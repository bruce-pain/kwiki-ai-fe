import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

// set token
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

// get token
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

// remove token
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// check if token exists
export const isTokenExists = () => {
    return !!getToken();
};

// check if token is expired
export const isTokenExpired = () => {
    const token = getToken();
    if (!token) return true;

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    return decodedToken.exp < currentTime;
};
