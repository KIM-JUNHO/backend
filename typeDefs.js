import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Firewall {
    id: ID
    name: String
    vdom: String
  }

  type Query {
    firewalls: [Firewall]
    firewall(id: ID!): Firewall
  }
`;
