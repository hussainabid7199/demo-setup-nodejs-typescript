"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: './.env' });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./connection/database"));
const ErrorHandler_1 = __importDefault(require("./helper/ErrorHandler"));
const routes_1 = __importDefault(require("./routes"));
// Database connection
const connectionString = process.env.DB_URL || "";
(0, database_1.default)(connectionString);
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.json());
let baseUrl = process.env.BASE_URL || "default_value";
app.use((0, cors_1.default)({
    "origin": baseUrl,
    "methods": ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    "optionsSuccessStatus": 204,
    "allowedHeaders": ['Content-Type', 'Clientid', 'Authorization'],
    "credentials": true
}));
app.use(ErrorHandler_1.default);
app.get("/", (req, res) => {
    return res.status(200).send("Welcome to the ESS");
});
app.use(routes_1.default);
let port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
