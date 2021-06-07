import { ApolloServer } from 'apollo-server';

import { environment } from './environment.js';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(environment.port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
