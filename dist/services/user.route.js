"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AsyncHandler_1 = __importDefault(require("../middleware/AsyncHandler"));
const userController_1 = require("../controller/userController");
const UserRouter = (0, express_1.Router)();
UserRouter.get("/", (0, AsyncHandler_1.default)(userController_1.handleAllUsers));
UserRouter.post("/", (0, AsyncHandler_1.default)(userController_1.handleCreateNewUser));
UserRouter.put("/:id", (0, AsyncHandler_1.default)(userController_1.handleUpdateUserById));
UserRouter.delete("/:id", (0, AsyncHandler_1.default)(userController_1.handleDeleteUserById));
UserRouter.get("/:id", (0, AsyncHandler_1.default)(userController_1.handleGetUserById));
exports.default = UserRouter;
