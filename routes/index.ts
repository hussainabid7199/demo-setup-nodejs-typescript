import { Router } from 'express';
import LoginRouter from '../services/account.route';
import Role from "../services/role.route";


const routes = Router();

routes.use("/login", LoginRouter);
routes.use("/role",  Role);


export default routes;
