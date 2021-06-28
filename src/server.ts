import { ApolloServer } from "apollo-server";
import { PrismaClient } from ".prisma/client";
import * as jwt from "jsonwebtoken";
import * as tg from "type-graphql";

import { StudentRelationsResolver } from "@generated/type-graphql";
import { StudentResolver } from "./resolvers/student/student";
import { CollageAdmin } from "./resolvers/admin/admin";

const server = async () => {
  const prisma: PrismaClient = new PrismaClient();

  const schema = await tg.buildSchema({
    resolvers: [StudentResolver, StudentRelationsResolver, CollageAdmin],
  });

  return new ApolloServer({
    schema,
    context: async ({ req }) => {
      const token: string = req.headers.authorization || "";
      if (token != "") {
        try {
          token.replace("Bearer", "");
          const decoded = jwt.verify(token, process.env.JWTSECRET as string);
          return { prisma, decoded };
        } catch (e) {
          throw new Error("Request denied");
        }
      } else {
        return { prisma, undefined };
      }
    },
  });
};

export default server;
