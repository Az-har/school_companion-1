import { ApolloServer, ForbiddenError } from "apollo-server-express";
import { PrismaClient } from ".prisma/client";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { Context } from "./utils/Types";
import { verifyToken } from "./utils/token";
import typeDefs from "./schema/schema";
import resolvers from "./resolvers/resolvers";

const server = async () => {
  const prisma: PrismaClient = new PrismaClient();
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }): Promise<Context> => {
      const token: string = req.headers.authorization || "";
      if (token != "") {
        try {
          const result = verifyToken(token.replace("Bearer ", ""));
          return { prisma, userId: result };
        } catch (e) {
          throw new ForbiddenError("Request denied");
        }
      } else {
        return { prisma, userId: undefined };
      }
    },
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  return httpServer;
};

export default server;
