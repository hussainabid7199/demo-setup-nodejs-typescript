"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_route_1 = __importDefault(require("../services/account.route"));
const role_route_1 = __importDefault(require("../services/role.route"));
const user_route_1 = __importDefault(require("../services/user.route"));
const student_route_1 = __importDefault(require("../services/student.route"));
const Auth_middleware_1 = __importDefault(require("../middleware/Auth.middleware"));
const AsyncHandler_1 = __importDefault(require("../middleware/AsyncHandler"));
const routes = (0, express_1.Router)();
routes.use("/login", account_route_1.default);
routes.use("/role", Auth_middleware_1.default, (0, AsyncHandler_1.default)(role_route_1.default));
routes.use("/user", Auth_middleware_1.default, (0, AsyncHandler_1.default)(user_route_1.default));
routes.use("/student", Auth_middleware_1.default, (0, AsyncHandler_1.default)(student_route_1.default));
exports.default = routes;
