import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config';

const usersResolver = {
  Mutation: {
    async register(
      _: any,
      {
        registerInput: { username, email, password, confirmPassword },
      }: {
        registerInput: {
          username: string;
          email: string;
          password: string;
          confirmPassword: string;
        };
      },
      context: any,
      info: any
    ) {
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return {
        // @ts-ignore
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

export default usersResolver;
