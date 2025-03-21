"use server";

import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { authActionClient } from "~/lib/safe-action";
import { auth } from "~/server/lib/auth";

import { banUserSchema, createUserSchema, updateUserSchema } from "./schemas";
// import { updateUser } from "./server/repository";

export const createUserAction = authActionClient
  .metadata({ actionName: "createUserAction" })
  .schema(createUserSchema)
  .action(async ({ parsedInput }) => {
    await auth.api.createUser({
      headers: await headers(),
      body: {
        name: parsedInput.name,
        email: parsedInput.email,
        role: parsedInput.role,
        password: parsedInput.password,
      },
    });
    revalidateTag("users");
  });

export const unbanUserAction = authActionClient
  .metadata({ actionName: "unbanUserAction" })
  .schema(banUserSchema)
  .action(async ({ parsedInput }) => {
    await auth.api.unbanUser({
      headers: await headers(),
      body: {
        userId: parsedInput.userId,
        banReason: parsedInput.banReason,
        banExpiresIn: parsedInput.banExpiresIn,
      },
    });
    revalidateTag("users");
  });

export const banUserAction = authActionClient
  .metadata({ actionName: "banUserAction" })
  .schema(banUserSchema)
  .action(async ({ parsedInput }) => {
    await auth.api.banUser({
      headers: await headers(),
      body: {
        userId: parsedInput.userId,
        banReason: parsedInput.banReason,
        banExpiresIn: parsedInput.banExpiresIn,
      },
    });
    revalidateTag("users");
  });

export const updateUserAction = authActionClient
  .metadata({ actionName: "updateUserAction" })
  .bindArgsSchemas([z.string()])
  .schema(updateUserSchema)
  .action(async ({ parsedInput, bindArgsParsedInputs: [userId] }) => {
    await auth.api.updateUser({
      headers: await headers(),
      body: {
        userId,
        name: parsedInput.name,
        email: parsedInput.email,
        image: parsedInput.image,
      },
    });
    revalidateTag("users");
  });
