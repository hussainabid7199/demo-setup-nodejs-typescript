import { Router } from 'express';
import LoginRouter from '../services/account.route';
import Role from "../services/role.route";
import User from "../services/user.route";


const routes = Router();

routes.use("/login", LoginRouter);
routes.use("/role",  Role);
routes.use("/user",  User);


export default routes;
