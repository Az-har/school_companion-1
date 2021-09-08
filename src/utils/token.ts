import * as jwt from "jsonwebtoken";

const createToken = (userId: string, role: userRole): string => {
  return jwt.sign({ userId, role }, process.env.JWTSECRET as string, {
    expiresIn: "7d",
  });
};

const verifyToken = async (token: string): Promise<jwt.JwtPayload> => {
  token.replace("Bearer", "");
  return jwt.verify(token, process.env.JWTSECRET as string) as jwt.JwtPayload;
};

enum userRole {
  STUDENT,
  EMPLOYEE,
  ADMIN,
}

export { createToken, verifyToken, userRole };
