"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AsyncHandler_1 = __importDefault(require("../middleware/AsyncHandler"));
const roleController_1 = require("../controller/roleController");
const RoleRouter = (0, express_1.Router)();
RoleRouter.get("/", (0, AsyncHandler_1.default)(roleController_1.handleAllUserRole));
RoleRouter.post("/", (0, AsyncHandler_1.default)(roleController_1.handleCreateNewUserRole));
RoleRouter.put("/:id", (0, AsyncHandler_1.default)(roleController_1.handleUpdateUserRoleById));
RoleRouter.delete("/:id", (0, AsyncHandler_1.default)(roleController_1.handleDeleteUserRoleById));
RoleRouter.get("/:id", (0, AsyncHandler_1.default)(roleController_1.handleGetUserRoleById));
exports.default = RoleRouter;
