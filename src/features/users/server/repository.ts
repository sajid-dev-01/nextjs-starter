import "server-only";

import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  gte,
  inArray,
  like,
  lte,
} from "drizzle-orm";

import { GetUsersSchema } from "~/features/users/schemas";
import { db, table } from "~/server/db/drizzle";
import { unstable_cache } from "~/server/lib/unstable-cache";

const REVALIDATION_INTERVAL = 20; // seconds

export async function getUsers(input: GetUsersSchema) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage;
        const fromDate = input.from ? new Date(input.from) : undefined;
        const toDate = input.to ? new Date(input.to) : undefined;

        const where = and(
          input.name ? like(table.users.name, `%${input.name}%`) : undefined,
          input.role.length > 0
            ? inArray(table.users.role, input.role)
            : undefined,
          fromDate ? gte(table.users.createdAt, fromDate) : undefined,
          toDate ? lte(table.users.createdAt, toDate) : undefined
        );

        const orderBy =
          input.sort.length > 0
            ? input.sort.map((item) =>
                item.desc
                  ? desc(table.users[item.id])
                  : asc(table.users[item.id])
              )
            : [asc(table.users.createdAt)];

        const { data, total } = await db.transaction(async (tx) => {
          const data = await tx
            .select()
            .from(table.users)
            .limit(input.perPage)
            .offset(offset)
            .where(where)
            .orderBy(...orderBy);

          const total = await tx
            .select({
              count: count(),
            })
            .from(table.users)
            .where(where)
            .execute()
            .then((res) => res[0]?.count ?? 0);

          return {
            data,
            total,
          };
        });

        const pageCount = Math.ceil(total / input.perPage);
        return { data, pageCount };
      } catch (_err) {
        return { data: [], pageCount: 0 };
      }
    },
    [JSON.stringify(input)],
    {
      revalidate: REVALIDATION_INTERVAL,
      tags: ["users"],
    }
  )();
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
              {} as Record<User["role"], number>
            )
          );
      } catch (_err) {
        return {} as Record<User["role"], number>;
      }
    },
    ["user-role-counts"],
    {
      revalidate: REVALIDATION_INTERVAL,
      tags: ["users"],
    }
  )();
}

export async function updateUser(
  id: User["id"],
  data: Partial<Pick<User, "name" | "email" | "image">>
) {
  return await db
    .update(table.users)
    .set({
      name: data.name,
      email: data.email,
      image: data.image,
    })
    .where(eq(table.users.id, id));
}
