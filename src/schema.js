const { gql } = require('apollo-server-express');

module.exports = gql`
  type Book {
    id: ID!
    title: String!
    author: ID!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    books: [Book!]!
  }
  type Query {
    hello: String
    books: [Book!]!
    book(id: ID!): Book!
    users: [User!]!
  }
  type Mutation {
    addBook(title: String!): Book!
    updateBook(id: ID!, title: String!): Book!
    deleteBook(id: ID!): Boolean!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;
