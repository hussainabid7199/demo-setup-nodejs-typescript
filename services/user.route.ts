import { Router } from "express";
import AsyncHandler from "../middleware/AsyncHandler";
import {
    handleAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
} from "../controller/userController";

const RoleRouter: Router = Router();

RoleRouter.get("/", AsyncHandler(handleAllUsers));
RoleRouter.post("/", AsyncHandler(handleCreateNewUser));
RoleRouter.put("/:id", AsyncHandler(handleUpdateUserById));
RoleRouter.delete("/:id", AsyncHandler(handleDeleteUserById));
RoleRouter.get("/:id", AsyncHandler(handleGetUserById));

export default RoleRouter;