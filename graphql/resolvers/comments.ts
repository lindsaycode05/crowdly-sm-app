import { checkAuth } from './../../util/check-auth';
import Post from '../../models/Post';
import { AuthenticationError, UserInputError } from 'apollo-server';

const commentsResolver = {
  Mutation: {
    async createComment(
      _: any,
      { postId, body }: { postId: string; body: string },
      context: any
    ) {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Comment body must not be empty', {
          errors: {
            body: 'Comment body must not be empty',
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found', {
          errors: {
            body: 'Post not found',
          },
        });
      }
    },

    async deleteComment(
      _: any,
      { postId, commentId }: { postId: string; commentId: string },
      context: any
    ) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex(
          // @ts-ignore
          (comment) => comment.id === commentId
        );
        // if comment doesn't belong to the correct user
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    },
  },
};

export default commentsResolver;
