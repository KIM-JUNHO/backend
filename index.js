const { ApolloServer } = require('apollo-server');

const { environment } = require('./environment.js');
const { typeDefs } = require('./schema.js');
const { resolvers } = require('./resolvers.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(environment.port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
