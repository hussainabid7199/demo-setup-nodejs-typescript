"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const verifyAccessToken = (req, res, next) => {
    const authToken = req.headers['Authorization'];
    const clientId = req.headers['CLIENT_ID'];
    const clientVerification = clientId === process.env.CLIENT_ID;
    if (!clientId) {
        res.status(401).json({ message: 'Unauthorized: Client ID not provided' });
    }
    else if (!clientVerification) {
        res.status(401).json({ message: 'unauthorized user' });
    }
    if (!authToken) {
        res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }
    try {
        const secretKey = process.env.SECRET_KEY;
        const token = authToken.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = {
            status: decoded,
            statusCode: 200
        };
        next();
    }
    catch (error) {
        if (error) {
            next((0, http_errors_1.default)(401, 'Unauthorized'));
        }
        next();
    }
};
exports.default = verifyAccessToken;
