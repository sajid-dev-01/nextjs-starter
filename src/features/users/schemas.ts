import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";
import { z } from "zod";

import { ROLES } from "~/constants";
import {
  getBaseSearchParamsCache,
  getBaseSearchQuerySchema,
} from "~/lib/data-table/parsers";

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(ROLES),
});
export type CreateUserPayload = z.infer<typeof createUserSchema>;

export const updateUserRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(ROLES),
});
export type UpdateUserRolePayload = z.infer<typeof updateUserRoleSchema>;

export const userSearchParamsCache = createSearchParamsCache({
  ...getBaseSearchParamsCache<User>(),
  name: parseAsString,
  role: parseAsArrayOf(z.enum(ROLES)).withDefault([]),
  status: parseAsArrayOf(z.enum(["banned", "active"])).withDefault([]),
  createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
});
export type UserSearchParams = Awaited<
  ReturnType<typeof userSearchParamsCache.parse>
>;

export const userSearchQuerySchema = z.object({
  ...getBaseSearchQuerySchema(["createdAt", "name"] as Array<keyof User>),
  name: z.string().nullable(),
  role: z.enum(ROLES).array().default([]),
  status: z.enum(["banned", "active"]).array().default([]),
  createdAt: z.number().array().default([]),
});
export type UserSearchQueryPayload = z.infer<typeof userSearchQuerySchema>;
