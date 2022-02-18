import { gql } from "apollo-server-koa";

export const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    book: [Book]
  }
`;

export const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin"
  },
  {
    title: "City of Glass",
    author: "Paul Auster"
  }
];
