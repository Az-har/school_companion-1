import { hashPassword, verifyPassword } from "../utils/password";
import { createToken } from "../utils/token";
import { Context, LoginOrSignUpAdminInput } from "../utils/Types";

const Mutation = {
  // Creating a new admin resolver
  async signUpAdmin(
    _parents: any,
    args: LoginOrSignUpAdminInput,
    ctx: Context,
    _info: any
  ): Promise<any> {
    const hashedPassword = await hashPassword(args.data.password);

    const admin = await ctx.prisma.admin.create({
      data: {
        email: args.data.email,
        password: hashedPassword,
      },
    });

    const token = createToken(admin.id);

    return { token, user: admin };
  },

  // Admin login resolver
  async loginAdmin(
    _parents: any,
    args: LoginOrSignUpAdminInput,
    ctx: Context,
    _info: any
  ): Promise<Object> {
    const admin = await ctx.prisma.admin.findUnique({
      where: { email: args.data.email },
    });

    if (!admin) {
      throw new Error("User is not found");
    }

    const isValid = await verifyPassword(args.data.password, admin.password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = createToken(admin.id);

    return { token, user: admin };
  },
};

export default Mutation;
