import { ApolloServer } from 'apollo-server';

import { environment } from './environment.js';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

import mongodb from 'mongodb';
const { MongoClient } = mongodb;

let db;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(process.env.MONGO_DB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        if (!dbClient.isConnected()) await dbClient.connect();
        db = dbClient.db('local');
      } catch (e) {
        console.log('--->error while connecting with graphql context (db)', e);
      }
    }
    return { db };
  },
});

server.listen(environment.port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
