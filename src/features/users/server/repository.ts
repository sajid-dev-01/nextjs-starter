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
        const banned =
          input.status.includes("banned") && !input.status.includes("active");

        const where = and(
          input.name ? like(table.users.name, `%${input.name}%`) : undefined,
          input.role.length > 0
            ? inArray(table.users.role, input.role)
            : undefined,
          banned ? eq(table.users.banned, true) : undefined,
          input.createdAt.length > 0
            ? and(
                input.createdAt[0]
                  ? gte(
                      table.users.createdAt,
                      (() => {
                        const date = new Date(input.createdAt[0]);
                        date.setHours(0, 0, 0, 0);
                        return date;
                      })()
                    )
                  : undefined,
                input.createdAt[1]
                  ? lte(
                      table.users.createdAt,
                      (() => {
                        const date = new Date(input.createdAt[1]);
                        date.setHours(23, 59, 59, 999);
                        return date;
                      })()
                    )
                  : undefined
              )
            : undefined
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
