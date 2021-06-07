import { ApolloServer } from 'apollo-server';

import { environment } from './environment.js';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

import Firewalls from './data-sources/Firewalls.js';

import mongodb from 'mongodb';
const { MongoClient } = mongodb;

const uri = 'mongodb://70.60.18.153:27017/wallbrain-log';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');
  } catch (error) {
    console.log(error);
  }
}

await run().catch(console.dir);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      firewalls: new Firewalls(client.db('wallbrain-log').collection('wbt_log_fw')),
    };
  },
});

server.listen(environment.port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
