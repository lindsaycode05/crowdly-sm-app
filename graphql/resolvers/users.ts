import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config';
import { UserInputError } from 'apollo-server';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../../util/validators';

const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

const usersResolver = {
  Mutation: {
    async login(
      _: any,
      { username, password }: { username: string; password: string }
    ) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.username = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      const isMatch = await bcrypt.compare(password, user.password || '');
      if (!isMatch) {
        errors.password = 'Wrong password';
        throw new UserInputError('Wrong password', { errors });
      }
      const token = generateToken(user);

      return {
        // @ts-ignore
        ...user._doc,
        id: user._id,
        token,
      };
    },

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
      }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

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
