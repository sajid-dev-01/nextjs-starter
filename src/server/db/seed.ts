import { eq } from "drizzle-orm";

import { auth } from "../lib/auth";
import { db, table } from "./index";

async function seed() {
  await db.insert(table.roles).values([
    {
      name: "admin",
      permissions: null,
    },
    {
      name: "user",
      permissions: null,
    },
  ]);
  const email = "test@test.com";
  const password = "admin123";

  const data = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: "Test User",
      role: "Admin",
    },
  });
  if (!data) {
    throw new Error("Failed to create user");
  }

  await db
    .update(table.users)
    .set({ role: "admin" })
    .where(eq(table.users.id, data.user.id));
}

seed()
  .catch((error) => {
    console.error("Seed process failed:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("Seed process finished. Exiting...");
    process.exit(0);
  });
