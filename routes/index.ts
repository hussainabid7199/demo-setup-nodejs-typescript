import { Router } from 'express';
import LoginRouter from '../services/account.route';
import Role from "../services/role.route";
import User from "../services/user.route";
import Student from "../services/student.route";
import Authentication from '../middleware/Auth.middleware';
import AsyncHandler from '../middleware/AsyncHandler';


const routes = Router();

routes.use("/login", LoginRouter);
routes.use("/role", Authentication, AsyncHandler(Role));
routes.use("/user", Authentication, AsyncHandler(User));
routes.use("/student", Authentication, AsyncHandler(Student));

export default routes;
