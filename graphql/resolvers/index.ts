import postsResolver from './posts';
import usersResolver from './users';

export default {
  Query: {
    ...postsResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
  },
};
