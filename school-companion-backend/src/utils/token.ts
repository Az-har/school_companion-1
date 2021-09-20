import * as jwt from "jsonwebtoken";

const createToken = (
  userId: string,
  role: "ADMIN" | "EMPLOYEE" | "STUDENT"
): string => {
  return jwt.sign({ userId, role }, process.env.JWTSECRET as string, {
    expiresIn: "7d",
  });
};

const verifyToken = async (token: string): Promise<jwt.JwtPayload> => {
  token.replace("Bearer", "");
  return jwt.verify(token, process.env.JWTSECRET as string) as jwt.JwtPayload;
};

export { createToken, verifyToken };
