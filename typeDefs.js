import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar DateTime
  scalar EmailAddress
  scalar UnsignedInt

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: EmailAddress
    posts: [Post]
    following: [User]
    followers: [User]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    publishedAt: DateTime
    likedBy: [User]
  }

  type Query {
    post(id: ID!): Post
  }

  input PublishPostInput {
    title: String!
    content: String!
  }

  type Mutation {
    publishPost(input: PublishPostInput!): Post!
    followUser(userId: ID!): UnsignedInt!
    unfollowUser(userId: ID!): UnsignedInt!
    likePost(postId: ID!): UnsignedInt!
  }
`;
