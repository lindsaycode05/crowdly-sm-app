import { model, Schema } from 'mongoose';

interface IPost {
  body: string;
  username: string;
  createdAt: string;
  comments: { body: string; username: string; createdAt: string }[];
  likes: { username: string; createdAt: string }[];
  user: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

export default model<IPost>('Post', postSchema);
