// import { ApolloServer } from "@apollo/server";
import { ApolloServer, gql } from "apollo-server-express";
import users from "./users/index.js";
import { GraphQLUpload } from "graphql-upload";

const gqlServer = new ApolloServer({
  typeDefs: gql`
              ${users.typedefs}
              
              type Query{
                ${users.queries}
              }
              type Mutation{
               ${users.mutations}
            }
            `,
  resolvers: {
    Upload: GraphQLUpload,
    Query: { ...users.resolvers.queries },
    Mutation: { ...users.resolvers.mutations },
  },
});

export default gqlServer;
