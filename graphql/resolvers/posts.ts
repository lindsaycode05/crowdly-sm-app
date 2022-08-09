import Post from '../../models/Post';
import { checkAuth } from '../../util/check-auth';
import { AuthenticationError, UserInputError } from 'apollo-server';

const postsResolver = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        // typed error
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        throw new Error(message);
      }
    },
    async getPost(_: any, { postId }: { postId: string }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        throw new Error(message);
      }
    },
  },
  Mutation: {
    async createPost(_: any, { body }: { body: string }, context: any) {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('Body must not be empty');
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },

    async deletePost(_: any, { postId }: { postId: string }, context: any) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);

        if (user.username === post?.username) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        throw new Error(message);
      }
    },

    async likePost(_: any, { postId }: { postId: string }, context: any) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already liked, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
  },
};

export default postsResolver;
