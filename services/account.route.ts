import { Router, Request, Response } from 'express';
import handleLogin from '../controller/accountController';

const LoginRouter = Router();

LoginRouter.post("/", handleLogin);

export default LoginRouter;
