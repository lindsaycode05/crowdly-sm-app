import { ApolloServer, ServerInfo } from 'apollo-server';
import mongoose from 'mongoose';

import { typeDefs } from './graphql/typeDefinitions';
import resolvers from './graphql/resolvers';
import { MONGODB } from './config';

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res: ServerInfo) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err: Error) => {
    console.error(err);
  });
