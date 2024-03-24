"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const clientId = req.headers["clientid"];
        if (!clientId) {
            return res.status(400).json({ error: "ClientId is missing" });
        }
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ error: "Unauthorized: Invalid token format" });
        }
        const token = authHeader.split(" ")[1];
        if (clientId !== process.env.CLIENT_ID) {
            return res.status(401).json({ error: "Unauthorized: Invalid Client Id" });
        }
        const secretKey = process.env.SECRET_KEY;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Unauthorized Error:", error);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};
exports.default = Authenticate;
