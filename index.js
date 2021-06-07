import { ApolloServer } from 'apollo-server';

import { DateTimeMock, EmailAddressMock, UnsignedIntMock } from 'graphql-scalars';

import { environment } from './environment.js';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

import mongodb from 'mongodb';
const { MongoClient } = mongodb;

const uri = 'mongodb://localhost:27017/local';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: {
    DateTime: DateTimeMock,
    EmailAddress: EmailAddressMock,
    UnsignedInt: UnsignedIntMock,
  }, // TODO: Remove in PROD.
  mockEntireSchema: false, // TODO: Remove in PROD.
});

server.listen(environment.port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
