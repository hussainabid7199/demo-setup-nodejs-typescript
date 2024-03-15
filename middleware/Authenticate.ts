import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import createError from 'http-errors';

interface CustomRequest extends Request {
    user: {
        status: string;
        statusCode: number;
    };
}

const Authentication = async(req: Request, res: Response, next: NextFunction) => {
    const authToken: string = req.headers['Authorization'] as string;
    const clientId: string = req.headers['clientId'] as string;
    
    console.log("authToken",authToken)
    console.log("clientId",clientId)
  const clientVerification: boolean = clientId === process.env.CLIENT_ID;

  if (!clientId) {
    res.status(401).json({ message: 'Unauthorized: Client ID not provided' });
  } else if (!clientVerification) {
    res.status(401).json({ message: 'unauthorized user' });
  }

  if (!authToken) {
    res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  try {
    const secretKey: string = process.env.SECRET_KEY as string;
    const token: string = authToken.split(' ')[1];
    const decoded: any = jwt.verify(token, secretKey) as VerifyErrors;
    // req.user = {
    //   status: decoded,
    //   statusCode: 200
    // };
    next(decoded);
  } catch (error) {
    if (error) {
      next(createError(401, 'Unauthorized'));
    }
    next();
  }
};

export default Authentication;