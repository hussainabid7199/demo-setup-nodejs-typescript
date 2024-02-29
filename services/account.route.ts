import { Router, Request, Response } from 'express';
import handleLogin from '../controller/accountController';
import { AxiosRequest } from '../helper/AxiosRequest';
import AsyncHandler from '../middleware/AsyncHandler';

const LoginRouter = Router();

LoginRouter.post("/", AsyncHandler(handleLogin));

export default LoginRouter;
