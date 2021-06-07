import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { typeDefs, resolvers } from './schema.js';

dotenv.config();
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
