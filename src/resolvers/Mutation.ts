import { hashPassword, verifyPassword } from "../utils/password";
import { createToken, userRole } from "../utils/token";
import { Context, LoginOrSignUpAdminInput } from "../utils/types";
import isEmail from "validator/lib/isEmail";
import { ForbiddenError } from "apollo-server-errors";
import { PrismaSelect } from "../utils/prismaSelect";
import prismaDataValidator from "../utils/prismaDatavalidator";

const Mutation = {
  // Creating a new admin resolver
  async signUpAdmin(
    _parents: any,
    args: LoginOrSignUpAdminInput,
    ctx: Context,
    info: any
  ) {
    try {
      const select = new PrismaSelect(info).value;
      // validating email
      if (!isEmail(args.data.email)) {
        throw new Error("Invalid Arguments");
      }
      // creating new admin user
      try {
        const admin = await ctx.prisma.admin.create({
          data: {
            email: args.data.email,
            password: await hashPassword(args.data.password),
          },
          ...select,
        });
        // creating jwt token
        const token = createToken(admin.id, userRole.ADMIN);
        return { token, user: admin };
      } catch (e) {
        throw new ForbiddenError("Account already exist");
      }
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  },

  // Admin login resolver
  async loginAdmin(_parents: any, args: any, ctx: Context, info: any) {
    try {
      const select = new PrismaSelect(info).value;
      const admin = await ctx.prisma.admin.findUnique({
        where: { email: args.data.email },
        ...select,
      });
      if (!admin) {
        throw new ForbiddenError("Invalid Credentials");
      }
      const isMatch = await verifyPassword(args.data.password, admin.password);
      if (!isMatch) {
        throw new ForbiddenError("Invalid Credentials");
      }
      const token = createToken(admin.id, userRole.ADMIN);
      return { token, user: admin };
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  },

  // Creating new school resolver
  createSchool: async (_parent: any, args: any, ctx: Context, info: any) => {
    try {
      const data: any = prismaDataValidator({
        many: false,
        args: args.data,
        connect: [{ name: "admin", id: ctx.user!.id }],
      });
      const select = new PrismaSelect(info).value;
      return await ctx.prisma.school.create({
        ...data,
        ...select,
      });
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  },

  // Creating new Employee resolver
  createEmployee: async (_parent: any, args: any, ctx: Context, info: any) => {
    try {
      const data: any = prismaDataValidator({
        many: false,
        args: args.data,
        connect: [{ name: "school", id: args.schoolId }],
      });
      const select = new PrismaSelect(info).value;
      return await ctx.prisma.employee.create({
        ...data,
        ...select,
      });
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  },

  // Creating new Employee resolver
  createEmployees: async (
    _parent: any,
    args: any,
    ctx: Context,
    _info: any
  ) => {
    try {
      const datasets: any = [];
      Object(args.data).forEach((data: any) => {
        console.log(data[1]);
        const result = prismaDataValidator({
          args: data,
          many: true,
          connect: [{ name: "school", id: args.schoolId }],
        });
        datasets.push(result);
      });
      return await ctx.prisma.employee
        .createMany({
          data: datasets,
          skipDuplicates: true,
        })
        .then((count) => count.count);
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  },

  // Creating new Department resolver
  createDepartment: async (
    _parent: any,
    args: any,
    ctx: Context,
    info: any
  ) => {
    try {
      const data: any = prismaDataValidator({
        many: false,
        args: args.data,
        connect: [{ name: "school", id: args.schoolId }],
      });

      // transforming data to createMany new section
      if (data.data.createSections) {
        const createSections: String[] = data.data.createSections.map(
          (section: String) => {
            return {
              name: section,
              schoolId: args.schoolId,
            };
          }
        );
        data.data.section = {
          createMany: {
            data: createSections,
          },
        };
        delete data.data.createSections;
      }
      const select = new PrismaSelect(info).value;
      return await ctx.prisma.department.create({
        ...data,
        ...select,
      });
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  },
};

export default Mutation;
