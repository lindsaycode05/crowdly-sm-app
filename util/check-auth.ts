import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { AuthenticationError } from 'apollo-server';
import { IUser } from '../models/User';
import { JwtPayload } from '../node_modules/@types/jsonwebtoken';

// handle auth checks
export const checkAuth = (context: any) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY) as IUser & JwtPayload;
        return user;
      } catch (error) {
        throw new AuthenticationError('Your session expired. Sign in again.');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorisation header must be provided');
};
