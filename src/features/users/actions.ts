"use server";

import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { authActionClient } from "~/lib/safe-action";
import { auth } from "~/server/lib/auth";

import { updateUserSchema } from "./schemas";

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
