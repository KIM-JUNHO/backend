const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { environment } = require('./environment.js');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers');
const db = require('./db.js');
const models = require('./models');
const jwt = require('jsonwebtoken');

db.connect(environment.MONGO_DB_URI);

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Session invalid');
    }
  }
};

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const token = req.headers.authorization;
      const user = getUser(token);
      return { models, user };
    },
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => app.listen({ port: environment.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${environment.PORT}${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();
