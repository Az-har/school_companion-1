import { ApolloServer, ForbiddenError } from "apollo-server-express";
import { PrismaClient } from ".prisma/client";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { Context, User } from "./utils/types";
import { verifyToken } from "./utils/token";
import typeDefs from "./schema/Schema";
import resolvers from "./resolvers/Resolvers";


const server = async () => {
  const prisma: PrismaClient = new PrismaClient();
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    introspection: (process.env.ENV) as string === "DEV",
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }): Promise<Context> => {
      let user: User | undefined = undefined;
      const token: string = req.headers.authorization || "";
      if (token != "") {
        try {
          const result = await verifyToken(token.replace("Bearer ", ""));
          // checking user for admin
          if (result["role"] === "ADMIN") {
            const admin = await prisma.admin.findUnique({
              where: { id: result["userId"] },
              select: {
                id: true,
              },
            });
            user = {
              id: admin!.id,
              role: "ADMIN",
              premission: undefined,
            };
          }
          // checking user for employee or teacher
          else if (result["role"] === "EMPLOYEE") {
            const employee = await prisma.employee.findUnique({
              where: { id: result["userId"] },
            });
            user = {
              id: employee!.id,
              role: employee!.role,
              premission: undefined,
            };
          }
          // checking user for student
          else if (result["role"] === "STUDENT") {
            const student = await prisma.student.findUnique({
              where: { id: result["userId"] },
            });
            user = {
              id: student!.id,
              role: "STUDENT",
              premission: undefined,
            };
          } else {
            throw new ForbiddenError("Request denied");
          }
          return { prisma, user };
        } catch (e) {
          throw new ForbiddenError("Request denied");
        }
      } else {
        return { prisma, user: undefined };
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
