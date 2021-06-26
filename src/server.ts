import { ApolloServer } from "apollo-server";
import { PrismaClient } from ".prisma/client";
import * as tg from "type-graphql";
import { resolvers } from "@generated/type-graphql";

const server = async () => {
  const prisma: PrismaClient = new PrismaClient();

  const schema = await tg.buildSchema({ resolvers: resolvers });

  return new ApolloServer({
    schema,
    context: ({ req }) => {
      const token: String = req.headers.authorization || "";

      return { prisma, token };
    },
  });
};

export default server;
