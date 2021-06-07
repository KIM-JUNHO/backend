import { ApolloServer } from 'apollo-server';

import { environment } from './environment.js';
import { typeDefs, resolvers } from './schema.js';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(environment.port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
