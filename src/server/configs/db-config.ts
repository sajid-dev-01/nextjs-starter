import { env } from "~/env";

export const dbConfig = {
  driver: "turso",
  turso: {
    url: env.DATABASE_URL,
    token: env.DB_AUTH_TOKEN,
  },
};
