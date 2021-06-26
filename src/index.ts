import "reflect-metadata";
import server from "./server";

server().then((apolloServer) => {
  apolloServer
    .listen({ port: process.env.PORT })
    .then(() => {})
    .catch(() => {});
});
