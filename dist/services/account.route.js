"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountController_1 = __importDefault(require("../controller/accountController"));
const LoginRouter = (0, express_1.Router)();
LoginRouter.post("/", accountController_1.default);
exports.default = LoginRouter;
