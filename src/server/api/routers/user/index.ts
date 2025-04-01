import { revalidateTag } from "next/cache";
import { z } from "zod";

import {
  banUserSchema,
  createUserSchema,
  userListQuery,
} from "~/features/users/schemas";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { auth } from "~/server/lib/auth";

import { getUserRoleCounts, getUsers } from "./repository";

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

  list: protectedProcedure.input(userListQuery).query(async ({ input }) => {
    const data = await getUsers(input);
    return data ?? null;
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

  ban: protectedProcedure
    .input(banUserSchema)
    .mutation(async ({ ctx, input }) => {
      await auth.api.banUser({
        headers: ctx.headers,
        body: {
          userId: input.userId,
          banReason: input.banReason,
          banExpiresIn: input.banExpiresIn,
        },
      });
      revalidateTag("users");
    }),

  unban: protectedProcedure
    .input(banUserSchema)
    .mutation(async ({ ctx, input }) => {
      await auth.api.unbanUser({
        headers: ctx.headers,
        body: {
          userId: input.userId,
          banReason: input.banReason,
          banExpiresIn: input.banExpiresIn,
        },
      });
      revalidateTag("users");
    }),

  remove: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await auth.api.removeUser({
        headers: ctx.headers,
        body: {
          userId: input.userId,
        },
      });
      revalidateTag("users");
    }),
});
