import { Router } from "express";
import AsyncHandler from "../middleware/AsyncHandler";
import {
    handleCreateNewStudent, handleGetStudentById, handleAllStudent
} from "../controller/studentController";
import authentication from "../middleware/Authenticate";

const StudentRouter: Router = Router();


StudentRouter.post("/", AsyncHandler(handleCreateNewStudent));
StudentRouter.get("/", AsyncHandler(handleAllStudent));
StudentRouter.get("/:id", AsyncHandler(handleGetStudentById));

export default StudentRouter; 