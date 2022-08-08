import Post from '../../models/Post';

const postsResolver = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        // typed error
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        throw new Error(message);
      }
    },
  },
};

export default postsResolver;
