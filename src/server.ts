import { ApolloServer } from "apollo-server";
import { PrismaClient } from ".prisma/client";
import * as bcrypt from "bcryptjs";
import * as tg from "type-graphql";

import { StudentResolver } from "./resolvers/student/student";

const server = async () => {
  const prisma: PrismaClient = new PrismaClient();

  const schema = await tg.buildSchema({ resolvers: [StudentResolver] });

  return new ApolloServer({
    schema,
    context: async ({ req }) => {
      const token: String = req.headers.authorization || "";

      if (token != "") {
      } else {
        return { prisma, token };
      }
    },
  });
};

export default server;
