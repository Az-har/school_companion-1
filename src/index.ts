import "reflect-metadata";
import server from "./server";

server
  .listen({ port: process.env.PORT })
  .then(() => {})
  .catch(() => {});
