import { PrismaClient } from "@prisma/client";

export interface Context {
  prisma: PrismaClient;
  user?: User;
}

export interface User {
  id: string;
  role: "STUDENT" | "ADMIN" | "EMPLOYEE" | "TEACHER";
  premission: {} | undefined;
}

export interface LoginOrSignUpAdminInput {
  data: { email: string; password: string };
}
