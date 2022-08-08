import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config';
import { UserInputError } from 'apollo-server';
import validateRegisterInput from '../../util/validators';

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
