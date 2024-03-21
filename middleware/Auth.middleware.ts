import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

const Authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader: string | undefined = req.headers["authorization"];
    const clientId = req.headers["clientid"];

    if (!clientId) {
      return res.status(400).json({ error: "ClientId is missing" });
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    if (clientId !== process.env.CLIENT_ID) {
      return res.status(401).json({ error: "Unauthorized: Invalid Client Id" });
    }

    const secretKey: string = process.env.SECRET_KEY as string;
    const decoded: any = jwt.verify(token, secretKey) as VerifyErrors;

    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("Unauthorized Error:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default Authenticate;
