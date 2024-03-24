"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema_1 = __importDefault(require("../schema/UserSchema"));
const accountValidation_1 = __importDefault(require("../validation/accountValidation"));
const http_errors_1 = __importDefault(require("http-errors"));
const jwt_helper_1 = require("../middleware/jwt.helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const CustomResponse_1 = __importDefault(require("../helper/CustomResponse"));
const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = accountValidation_1.default.validateSync(req.body);
        if (!email || !password) {
            throw res.status(400).json({ error: "Please fill in the data" });
        }
        const user = await UserSchema_1.default.findOne({ email: email, isActive: true });
        if (!user) {
            throw http_errors_1.default.NotFound("User not registered!");
        }
        const isMatchPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isMatchPassword) {
            throw http_errors_1.default.Unauthorized("Email or Password is not valid!");
        }
        const accessToken = await (0, jwt_helper_1.loginAccessToken)(user.id);
        user.token = accessToken;
        res.cookie("cookies", accessToken, { httpOnly: true, secure: true });
        res.setHeader('Authorization', `at ${accessToken}`);
        res.setHeader('clientId', `${process.env.CLIENT_ID}`);
        (0, CustomResponse_1.default)(res, 200, "json", user);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: "Invalid email or password format" });
        }
        next(error);
    }
};
exports.default = handleLogin;
