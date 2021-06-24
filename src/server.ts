import { ApolloServer } from "apollo-server";
import { PrismaClient } from ".prisma/client";

//resolvers
import Query from "./resolvers/Query";

//typeDefs
import query from "./schema/Query";
import mutation from "./schema/Mutation";
import schema from "./schema/Schema";

const prisma: PrismaClient = new PrismaClient();

const typeDefs = [schema, query, mutation];

const resolvers = { Query };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token: String = req.headers.authorization || "";

    return { prisma, token };
  },
});

export default server;
