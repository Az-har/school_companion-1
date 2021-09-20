import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

prisma.department.create({
  data: {
    name: "",
    year: "",
    school: { connect: { id: "" } },
    section: { connect: { id: "" } },
  },
});
