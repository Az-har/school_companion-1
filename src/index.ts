import { resolve } from "path/posix";
import server from "./server";

server().then((apolloServer) => {
  apolloServer.listen({ port: process.env.PORT }, resolve);
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
});
