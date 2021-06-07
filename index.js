import { ApolloServer } from 'apollo-server';

import { DateTimeMock, EmailAddressMock, UnsignedIntMock } from 'graphql-scalars';

import { environment } from './environment.js';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

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
