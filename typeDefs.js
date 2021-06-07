import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Firewall {
    id: ID
    test: String
  }
  type Query {
    firewalls: Firewall
  }
`;
