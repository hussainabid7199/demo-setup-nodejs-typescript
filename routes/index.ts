import { Router } from 'express';
import LoginRouter from '../services/account.route';
import Role from "../services/role.route";
import User from "../services/user.route";
import Student from "../services/student.route";
import Authentication from '../middleware/Authenticate';



const routes = Router();

routes.use("/login", LoginRouter);
routes.use("/role", Authentication,  Role);
routes.use("/user",  User);
routes.use("/student",  Student);

export default routes;
