import express from "express";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import gqlServer from "./graphql/index.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./router/userRoute.js";
import { graphqlUploadExpress } from "graphql-upload";

dotenv.config();

(async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/rest", userRoute);
    app.use(graphqlUploadExpress());
    const httpServer = http.createServer(app);
    await gqlServer.start();
    gqlServer.applyMiddleware({ app });

    // app.use(
    //   "/graphql",
    //   expressMiddleware(gqlServer, {
    //     context: async ({ req }) => ({
    //       token: req.headers["token"],
    //     }),
    //   })
    // );

    await mongoose.connect(process.env.MONGODB_URI);
    if (mongoose.connections[0]._readyState === 1) {
      console.log("MongoDB is connected");

      await new Promise((resolve) =>
        httpServer.listen({ port: 4000 }, resolve)
      );

      console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    } else {
      throw new GraphQLError("MongoDB connection failed");
    }
  } catch (error) {
    throw new GraphQLError(error.message);
  }
})();
