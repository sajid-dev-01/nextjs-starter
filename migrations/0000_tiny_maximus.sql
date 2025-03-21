CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`accessTokenExpiresAt` integer,
	`refreshTokenExpiresAt` integer,
	`scope` text,
	`idToken` text,
	`password` text,
	`createdAt` integer DEFAULT '"2025-03-19T09:51:34.428Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-03-19T09:51:34.428Z"' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `role` (
	`name` text NOT NULL,
	`permissions` text,
	`createdAt` integer DEFAULT '"2025-03-19T09:51:34.428Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-03-19T09:51:34.428Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `role_name_unique` ON `role` (`name`);--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`token` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`createdAt` integer DEFAULT '"2025-03-19T09:51:34.428Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-03-19T09:51:34.428Z"' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`emailVerified` integer NOT NULL,
	`image` text,
	`role` text NOT NULL,
	`banned` integer,
	`banReason` text,
	`banExpires` integer,
	`createdAt` integer DEFAULT '"2025-03-19T09:51:34.428Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-03-19T09:51:34.428Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer DEFAULT '"2025-03-19T09:51:34.428Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-03-19T09:51:34.428Z"' NOT NULL
);
