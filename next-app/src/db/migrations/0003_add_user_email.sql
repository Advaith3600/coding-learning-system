ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email" text;

UPDATE "users"
SET "email" = lower(md5(random()::text || id::text) || '@legacy.local')
WHERE "email" IS NULL;

ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE ("email");
