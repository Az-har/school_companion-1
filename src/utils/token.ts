import * as jwt from "jsonwebtoken";

const createToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWTSECRET as string, {
    expiresIn: "7d",
  });
};

const verifyToken = async (token: string): Promise<string | jwt.JwtPayload> => {
  token.replace("Bearer", "");
  return jwt.verify(token, process.env.JWTSECRET as string);
};

export { createToken, verifyToken };
