import { revalidateTag } from "next/cache";

import {
  createUserSchema,
  updateUserRoleSchema,
  userSearchQuerySchema,
} from "~/features/users/schemas";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { auth } from "~/server/lib/auth";
import {
  getUserRoleCounts,
  userPaginate,
} from "~/server/repositories/user-repository";

export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      await auth.api.createUser({
        headers: ctx.headers,
        body: {
          name: input.name,
          email: input.email,
          role: input.role,
          password: input.password,
        },
      });
      revalidateTag("users");
    }),

  list: protectedProcedure
    .input(userSearchQuerySchema)
    .query(async ({ input }) => {
      const data = await userPaginate(input);
      return data ?? null;
    }),

  updateRole: protectedProcedure
    .input(updateUserRoleSchema)
    .mutation(async ({ ctx, input }) => {
      await auth.api.setRole({
        headers: ctx.headers,
        body: {
          userId: input.userId,
          role: input.role,
        },
      });
    }),

  userRoleCounts: protectedProcedure.query(async () => {
    const data = await getUserRoleCounts();
    return data ?? null;
  }),

  latest: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.users.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    return data ?? null;
  }),
});
