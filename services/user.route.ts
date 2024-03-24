import { Router } from "express";
import AsyncHandler from "../middleware/AsyncHandler";
import {
    handleAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
} from "../controller/userController";

const UserRouter: Router = Router();

UserRouter.get("/", AsyncHandler(handleAllUsers));
UserRouter.post("/", AsyncHandler(handleCreateNewUser));
UserRouter.put("/:id", AsyncHandler(handleUpdateUserById));
UserRouter.delete("/:id", AsyncHandler(handleDeleteUserById));
UserRouter.get("/:id", AsyncHandler(handleGetUserById));

export default UserRouter;