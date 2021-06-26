import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Student, StudentCreateInput } from "@generated/type-graphql";
import { Context } from "../../../context";

@Resolver()
export class RegisterResolver {
  @Query(() => [Student])
  async students(@Ctx() { prisma }: Context): Promise<[Student]> {
    return (await prisma.student.findMany()) as [Student];
  }

  @Mutation(() => Student)
  async registerStudent(
    @Arg("data") data: StudentCreateInput,
    @Ctx() { prisma }: Context
  ): Promise<Student> {
    return await prisma.student.create({ data });
  }
}
