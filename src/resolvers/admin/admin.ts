import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Admin, AdminCreateInput } from "@generated/type-graphql";
import { Context } from "../../context";
import { AdminAuthPayload } from "../../models/admin";

@Resolver()
export class CollageAdmin {
  @Query(() => Admin)
  async admin(
    @Ctx() { prisma }: Context,
    @Arg("id") id: string
  ): Promise<Admin | null> {
    return await prisma.admin.findUnique({ where: { id } });
  }

  @Mutation(() => AdminAuthPayload)
  async registerAdminWithCollage(
    @Arg("data") data: AdminCreateInput,
    @Ctx() { prisma }: Context
  ): Promise<AdminAuthPayload> {
    //hashing the plain password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    //changing plain password with hashed password
    data.password = hashedPassword;

    const admin = await prisma.admin.create({ data });
    //generating jwt token
    const token: string = jwt.sign(admin.id, process.env.JWTSECRET as string);
    return { token, admin };
  }
}
