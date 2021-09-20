import { hashPassword, verifyPassword } from "../utils/password";
import { createToken } from "../utils/token";
import { Context } from "../utils/types";
import isEmail from "validator/lib/isEmail";
import { ForbiddenError } from "apollo-server-errors";
import { PrismaSelect } from "../utils/prismaSelect";
import prismaDataValidator from "../utils/prismaDatavalidator";

const Mutation = {
  // Creating a new admin resolver
  async signUpAdmin(_parents: any, args: any, ctx: Context, _info: any) {
    try {
      // validating email
      if (!isEmail(args.data.email)) {
        throw new Error("Invalid Arguments");
      }

      const password = await hashPassword(args.data.password);
      const email = args.data.email;

      // creating new admin user
      try {
        const admin = await ctx.prisma.admin.create({
          data: {
            email,
            password,
          },
        });
        console.log(admin);

        // creating jwt token
        const token = createToken(admin.id, "ADMIN");
        return { token, user: admin };
      } catch (e) {
        console.log(e);
        throw new ForbiddenError("Account already exist");
      }
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  },

  // Admin login resolver
  async loginAdmin(_parents: any, args: any, ctx: Context, _info: any) {
    try {
      const admin = await ctx.prisma.admin.findUnique({
        where: { email: args.data.email },
      });
      if (!admin) {
        throw new ForbiddenError("Invalid Credentials");
      }
      const isMatch = await verifyPassword(args.data.password, admin.password);
      if (!isMatch) {
        throw new ForbiddenError("Invalid Credentials");
      }
      const token = createToken(admin.id, "ADMIN");
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

  // Creating new Sections resolver
  createSections: async (_parent: any, args: any, ctx: Context, _info: any) => {
    try {
      const datasets: any = [];
      Object(args.data).forEach((data: any) => {
        const result = prismaDataValidator({
          args: data,
          many: true,
          connect: [{ name: "school", id: args.schoolId }],
        });
        datasets.push(result);
      });
      return ctx.prisma.section
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

  // Creating new student reasolver
  createStudent: async (_parent: any, args: any, ctx: Context, info: any) => {
    try {
      const data: any = prismaDataValidator({
        many: false,
        args: args.data,
        connect: [{ name: "school", id: args.schoolId }],
      });
      const select = new PrismaSelect(info).value;
      // creating new student
      return await ctx.prisma.student.create({
        ...data,
        ...select,
      });
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  },

  // Creating new students reasolver
  createStudents: async (_parent: any, args: any, ctx: Context, _info: any) => {
    try {
      const datasets: any = [];
      Object(args.data).forEach((data: any) => {
        const result = prismaDataValidator({
          args: data,
          many: true,
          connect: [{ name: "school", id: args.schoolId }],
        });
        datasets.push(result);
      });
      return ctx.prisma.student
        .createMany({
          data: datasets,
          skipDuplicates: true,
        })
        .then((count) => count.count);
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  },
};

export default Mutation;
