import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { z } from "zod";

import { ROLES } from "~/constants";
import {
  getFiltersStateParser,
  getSortingStateParser,
} from "~/lib/data-table/parsers";

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(ROLES),
});
export type CreateUserPayload = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  image: z.string().nullish(),
});
export type UpdateUserPayload = z.infer<typeof updateUserSchema>;

export const banUserSchema = z.object({
  userId: z.string(),
  banReason: z.string().optional(),
  banExpiresIn: z.number().optional(),
});
export type BanUserPayload = z.infer<typeof banUserSchema>;

export const searchParamsCache = createSearchParamsCache({
  flags: parseAsArrayOf(z.enum(["advancedTable", "floatingBar"])).withDefault(
    []
  ),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<User>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  name: parseAsString.withDefault(""),
  role: parseAsArrayOf(z.enum(ROLES)).withDefault([]),
  // status: parseAsArrayOf(z.enum(tasks.status.enumValues)).withDefault([]),
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

export type GetUsersSchema = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
