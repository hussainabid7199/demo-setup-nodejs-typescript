import { Router } from "express";
import {
    handleAllUserRole,
    handleGetUserRoleById,
    handleUpdateUserRoleById,
    handleDeleteUserRoleById,
    handleCreateNewUserRole
} from "../controller/roleController";

const RoleRouter: Router = Router();

RoleRouter.get("/", handleAllUserRole);
RoleRouter.post("/", handleCreateNewUserRole);
RoleRouter.put("/:id", handleUpdateUserRoleById);
RoleRouter.delete("/:id", handleDeleteUserRoleById);
RoleRouter.get("/:id", handleGetUserRoleById);

export default RoleRouter;