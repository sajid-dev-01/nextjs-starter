import { UserWithRole } from "better-auth/plugins";

declare global {
  interface User extends UserWithRole {}
}
