"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.loginAccessToken = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
const http_errors_1 = __importDefault(require("http-errors"));
(0, dotenv_1.config)({ path: './.env' });
let id = "";
const loginAccessToken = (userId) => {
    id = userId;
    return new Promise((resolve, reject) => {
        const payload = { "userId": userId };
        const secret = process.env.SECRET_KEY;
        const options = {
            expiresIn: '1h',
            issuer: process.env.ISS,
            audience: '*',
        };
        (0, jsonwebtoken_1.sign)(payload, secret, options, (err, token) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                reject(http_errors_1.default.Unauthorized(message));
            }
            resolve(token || "");
        });
    });
};
exports.loginAccessToken = loginAccessToken;
const refreshAccessToken = () => {
    return new Promise((resolve, reject) => {
        const payload = { "userId": id };
        const secret = process.env.REFRESH_KEY;
        const options = {
            expiresIn: '1h',
            issuer: process.env.ISS,
            audience: '*',
        };
        (0, jsonwebtoken_1.sign)(payload, secret, options, (err, token) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                reject(http_errors_1.default.Unauthorized(message));
            }
            resolve(token || "");
        });
    });
};
exports.refreshAccessToken = refreshAccessToken;
