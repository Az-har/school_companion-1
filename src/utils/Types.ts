import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export interface Context {
  prisma: PrismaClient;
  userId?: string | JwtPayload;
}

export interface LoginOrSignUpAdminInput {
  data: { email: string; password: string };
}
