"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AsyncHandler_1 = __importDefault(require("../middleware/AsyncHandler"));
const userController_1 = require("../controller/userController");
const RoleRouter = (0, express_1.Router)();
RoleRouter.get("/", (0, AsyncHandler_1.default)(userController_1.handleAllUsers));
RoleRouter.post("/", (0, AsyncHandler_1.default)(userController_1.handleCreateNewUser));
RoleRouter.put("/:id", (0, AsyncHandler_1.default)(userController_1.handleUpdateUserById));
RoleRouter.delete("/:id", (0, AsyncHandler_1.default)(userController_1.handleDeleteUserById));
RoleRouter.get("/:id", (0, AsyncHandler_1.default)(userController_1.handleGetUserById));
exports.default = RoleRouter;
