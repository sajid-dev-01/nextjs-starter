import "server-only";

import { and, asc, count, desc, eq, gt, inArray, like } from "drizzle-orm";

import { type UserSearchParams } from "~/features/users/schemas";
import { dateFilterSql, db, table } from "~/server/db/drizzle";
import { unstable_cache } from "~/server/lib/unstable-cache";

const REVALIDATION_INTERVAL = 20; // seconds

export const insertUser = async (data: typeof table.users.$inferInsert) => {
  return db.insert(table.users).values(data);
};

export const findAnyUser = async () => {
  return db.query.users.findFirst();
};

export const updateUser = async (
  id: AuthUser["id"],
  data: Partial<
    Pick<AuthUser, "name" | "email" | "image" | "emailVerified" | "role">
  >
) => {
  return db
    .update(table.users)
    .set({
      ...data,
      role: data.role ?? "user",
    })
    .where(eq(table.users.id, id));
};

export async function userPaginate(input: UserSearchParams) {
  const banned =
    input.status &&
    input.status.includes("banned") &&
    !input.status.includes("active");

  const where = and(
    input.name ? like(table.users.name, `%${input.name}%`) : undefined,
    input.role && input.role.length > 0
      ? inArray(table.users.role, input.role)
      : undefined,
    banned ? eq(table.users.banned, true) : undefined,
    input.createdAt
      ? dateFilterSql(table.users.createdAt, input.createdAt)
      : undefined
  );

  const orderBy =
    input.sort && input.sort.length > 0
      ? input.sort.map((item) =>
          item.desc ? desc(table.users[item.id]) : asc(table.users[item.id])
        )
      : [asc(table.users.createdAt)];

  const [data, total] = await db.transaction((tx) =>
    Promise.all([
      tx.query.users.findMany({
        where,
        limit: input.perPage && input.perPage > 0 ? input.perPage : undefined,
        offset:
          input.page && input.perPage && input.perPage > 0
            ? (input.page - 1) * input.perPage
            : undefined,
        orderBy,
      }),
      tx
        .select({
          count: count(),
        })
        .from(table.users)
        .where(where)
        .execute()
        .then((res) => res[0]?.count ?? 0),
    ])
  );

  const pageCount =
    input.perPage && input.perPage > 0 ? Math.ceil(total / input.perPage) : 1;
  return { data, total, pageCount };
}

export async function getUserRoleCounts() {
  return unstable_cache(
    async () => {
      try {
        return await db
          .select({
            role: table.users.role,
            count: count(),
          })
          .from(table.users)
          .groupBy(table.users.role)
          .having(gt(count(), 0))
          .then((res) =>
            res.reduce(
              (acc, { role, count }) => {
                acc[role] = count;
                return acc;
              },
              {} as Record<NonNullable<AuthUser["role"]>, number>
            )
          );
      } catch (_err) {
        return {} as Record<NonNullable<AuthUser["role"]>, number>;
      }
    },
    ["user-role-counts"],
    {
      revalidate: REVALIDATION_INTERVAL,
      tags: ["users"],
    }
  )();
}
