import { Request, Response, NextFunction } from 'express';
import User from '../schema/UserSchema';
import accountValidation from '../validation/accountValidation';
import createError from 'http-errors';
import { loginAccessToken } from '../middleware/jwt.helper';
import bcrypt from 'bcrypt';
import response from '../helper/CustomResponse';

const handleLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = accountValidation.validateSync(req.body);

        if (!email || !password) {
            throw res.status(400).json({ error: "Please fill in the data" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            throw createError.NotFound("User not registered!");
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            throw createError.Unauthorized("Email or Password is not valid!");
        }

        const accessToken = await loginAccessToken(user.id);

        res.cookie("cookies", accessToken, { httpOnly: true, secure: true });
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.setHeader('CLIENT_ID', `${process.env.CLIENT_ID}`);

        response(res, 200, "json", "Login Successfull!");

    } catch (error: string | any) {
        if (error.name === 'ValidationError') {
            // return res.status(400).json({ error: "Invalid email or password format" });
            res.status(400).json({ error: "Invalid email or password format" });
        }

        next(error);
    }
};

export default handleLogin;