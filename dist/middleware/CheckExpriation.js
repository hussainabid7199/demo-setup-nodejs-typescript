"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.isTokenExpired = void 0;
const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }
    try {
        const decodedToken = (0, exports.decodeToken)(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTime;
    }
    catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};
exports.isTokenExpired = isTokenExpired;
const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''));
    return JSON.parse(jsonPayload);
};
exports.decodeToken = decodeToken;
