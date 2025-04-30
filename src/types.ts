import type { UserWithRole } from "better-auth/plugins";

declare global {
  interface Role {
    name: "admin" | "user";
    permissions: any;
    createdAt: Date;
    updatedAt: Date;
  }

  interface User extends Omit<UserWithRole, "role"> {
    role: Role["name"];
  }
}
