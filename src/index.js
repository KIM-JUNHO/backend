const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { environment } = require('./environment.js');
const { typeDefs } = require('./schema.js');
const { resolvers } = require('./resolvers.js');
const db = require('./db.js');

db.connect(environment.mongo_db_uri);

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  await new Promise((resolve) => app.listen({ port: environment.port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${environment.port}${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();
