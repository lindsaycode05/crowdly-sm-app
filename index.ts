import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import { typeDefs } from './graphql/typeDefinitions';
import resolvers from './graphql/resolvers';
import {MONGODB} from './config';

const PORT = process.env.PORT || 3000;

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res: any) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err: Error) => {
    console.error(err);
  });
