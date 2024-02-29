import { Router } from "express";
import AsyncHandler from "../middleware/AsyncHandler";
import {
    handleAllUserRole,
    handleGetUserRoleById,
    handleUpdateUserRoleById,
    handleDeleteUserRoleById,
    handleCreateNewUserRole
} from "../controller/roleController";

const RoleRouter: Router = Router();

RoleRouter.get("/", AsyncHandler(handleAllUserRole));
RoleRouter.post("/", AsyncHandler(handleCreateNewUserRole));
RoleRouter.put("/:id", AsyncHandler(handleUpdateUserRoleById));
RoleRouter.delete("/:id", AsyncHandler(handleDeleteUserRoleById));
RoleRouter.get("/:id", AsyncHandler(handleGetUserRoleById));

export default RoleRouter;