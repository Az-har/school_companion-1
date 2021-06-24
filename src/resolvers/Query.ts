import { PrismaClient } from "@prisma/client";

interface context {
  token: String;
  prisma: PrismaClient;
}

const Query = {
  async students(_parent: any, _args: any, _context: context, _info: any) {
    return await _context.prisma.student.findMany();
  },
};

export default Query;
