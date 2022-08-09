import { model, Schema } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

const userSchema = new Schema<IUser>({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

export default model<IUser>('User', userSchema);
