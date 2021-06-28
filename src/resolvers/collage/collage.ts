// import { Arg, Ctx, Query, Resolver } from "type-graphql";
// import { Collage, Admin } from "@generated/type-graphql";
// import { Context } from "../../context";

// @Resolver()
// export class CollageResolver {
//   @Query(() => Collage)
//   async collage(
//     @Ctx() { prisma }: Context,
//     @Arg("id") id: string
//   ): Promise<Collage | null> {
//     return await prisma.collage.findUnique({ where: { id } });
//   }

//   @Query(() => [Admin])
//   async admins(
//     @Ctx() { prisma }: Context,
//     @Arg("id") id: string
//   ): Promise<[Admin] | null> {
//     return (
//       await prisma.collage.findUnique({
//         where: { id },
//         select: { admin: true },
//       })
//     )?.admin as [Admin];
//   }
// }
