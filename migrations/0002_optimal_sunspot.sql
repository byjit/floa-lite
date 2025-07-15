DROP TABLE `ai_model`;--> statement-breakpoint
DROP INDEX "created_at_idx";--> statement-breakpoint
DROP INDEX "session_token_unique";--> statement-breakpoint
DROP INDEX "name_type_idx";--> statement-breakpoint
ALTER TABLE `tool` ALTER COLUMN "created_at" TO "created_at" integer;--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `conversation` (`created_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE INDEX `name_type_idx` ON `tool` (`name`,`type`);--> statement-breakpoint
ALTER TABLE `tool` ALTER COLUMN "updated_at" TO "updated_at" integer;--> statement-breakpoint
ALTER TABLE `conversation` ADD `bookmarked` integer DEFAULT false NOT NULL;