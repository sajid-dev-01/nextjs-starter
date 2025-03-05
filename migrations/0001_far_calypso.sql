DROP INDEX "role_name_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `account` ALTER COLUMN "createdAt" TO "createdAt" integer NOT NULL DEFAULT '"2025-03-05T04:44:21.804Z"';--> statement-breakpoint
CREATE UNIQUE INDEX `role_name_unique` ON `role` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `account` ALTER COLUMN "updatedAt" TO "updatedAt" integer NOT NULL DEFAULT '"2025-03-05T04:44:21.804Z"';--> statement-breakpoint
ALTER TABLE `role` ALTER COLUMN "createdAt" TO "createdAt" integer NOT NULL DEFAULT '"2025-03-05T04:44:21.804Z"';--> statement-breakpoint
ALTER TABLE `role` ALTER COLUMN "updatedAt" TO "updatedAt" integer NOT NULL DEFAULT '"2025-03-05T04:44:21.804Z"';--> statement-breakpoint
ALTER TABLE `session` ALTER COLUMN "createdAt" TO "createdAt" integer NOT NULL DEFAULT '"2025-03-05T04:44:21.804Z"';--> statement-breakpoint
ALTER TABLE `session` ALTER COLUMN "updatedAt" TO "updatedAt" integer NOT NULL DEFAULT '"2025-03-05T04:44:21.804Z"';--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "createdAt" TO "createdAt" integer NOT NULL DEFAULT '"2025-03-05T04:44:21.804Z"';--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "updatedAt" TO "updatedAt" integer NOT NULL DEFAULT '"2025-03-05T04:44:21.804Z"';--> statement-breakpoint
ALTER TABLE `verification` ALTER COLUMN "createdAt" TO "createdAt" integer NOT NULL DEFAULT '"2025-03-05T04:44:21.804Z"';--> statement-breakpoint
ALTER TABLE `verification` ALTER COLUMN "updatedAt" TO "updatedAt" integer NOT NULL DEFAULT '"2025-03-05T04:44:21.804Z"';