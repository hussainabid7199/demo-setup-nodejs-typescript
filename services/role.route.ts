import { Router } from "express";
import axios from "axios"
import AsyncHandler from "../middleware/AsyncHandler";
import {
    handleAllUserRole,
    handleGetUserRoleById,
    handleUpdateUserRoleById,
    handleDeleteUserRoleById,
    handleCreateNewUserRole
} from "../controller/roleController";
import verifyAccessToken from "../middleware/Auth.middleware";



const RoleRouter: Router = Router();

RoleRouter.get("/", handleAllUserRole);
RoleRouter.post("/", handleCreateNewUserRole);
RoleRouter.put("/:id", handleUpdateUserRoleById);
RoleRouter.delete("/:id", handleDeleteUserRoleById);
RoleRouter.get("/:id", handleGetUserRoleById);

export default RoleRouter;