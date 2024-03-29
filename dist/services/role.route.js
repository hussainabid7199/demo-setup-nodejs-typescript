"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleController_1 = require("../controller/roleController");
const RoleRouter = (0, express_1.Router)();
RoleRouter.get("/", roleController_1.handleAllUserRole);
RoleRouter.post("/", roleController_1.handleCreateNewUserRole);
RoleRouter.put("/:id", roleController_1.handleUpdateUserRoleById);
RoleRouter.delete("/:id", roleController_1.handleDeleteUserRoleById);
RoleRouter.get("/:id", roleController_1.handleGetUserRoleById);
exports.default = RoleRouter;
