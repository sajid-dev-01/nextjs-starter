import { createClient, ResultSet } from "@libsql/client";
import { ExtractTablesWithRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";

import { env } from "../../env";
import * as schema from "./schema";

export const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DB_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
export const table = schema;

export type DrizzleTransaction = SQLiteTransaction<
  "async",
  ResultSet,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

// export async function createTransaction<T extends typeof db>(
//   cb: (trx: T) => void
// ) {
//   await db.transaction(cb as any);
// }
