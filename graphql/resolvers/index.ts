import postsResolver from './posts';
import usersResolver from './users';
import commentsResolver from './comments';

export default {
  Post: {
    likeCount: (parent: any) => {
      return parent.likes.length;
    },
    commentCount: (parent: any) => {
      return parent.comments.length;
    },
  },
  Query: {
    ...postsResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...commentsResolver.Mutation,
  },
};
