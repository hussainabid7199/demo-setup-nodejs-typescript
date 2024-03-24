import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { sign, Secret, SignOptions } from 'jsonwebtoken';
import createError from 'http-errors';

config({ path: './.env' });

interface TokenPayload {
  userId: string;
}

let id:string = "";
export const loginAccessToken = (userId: string): Promise<string> => {
  id=userId;
  return new Promise((resolve, reject) => {
    const payload: TokenPayload = {"userId": userId};
    const secret: Secret = process.env.SECRET_KEY as string;
    const options: SignOptions = {
      expiresIn: '1h',
      issuer: process.env.ISS,
      audience: '*',
    };
    sign(payload, secret, options, (err, token) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        reject(createError.Unauthorized(message));
      }
      resolve(token || "");
    });
  });
};

export const refreshAccessToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload: TokenPayload = {"userId": id};
    const secret: Secret = process.env.REFRESH_KEY as string;
    const options: SignOptions = {
      expiresIn: '1h',
      issuer: process.env.ISS,
      audience: '*',
    };
    sign(payload, secret, options, (err, token) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        reject(createError.Unauthorized(message));
      }
      resolve(token || "");
    });
  });
};