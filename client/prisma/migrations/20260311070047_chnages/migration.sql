/*
  Warnings:

  - The values [BASIC] on the enum `SubPlans` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubPlans_new" AS ENUM ('FREE', 'PRO', 'CUSTOM');
ALTER TABLE "public"."User" ALTER COLUMN "subscriptionPlan" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "subscriptionPlan" TYPE "SubPlans_new" USING ("subscriptionPlan"::text::"SubPlans_new");
ALTER TYPE "SubPlans" RENAME TO "SubPlans_old";
ALTER TYPE "SubPlans_new" RENAME TO "SubPlans";
DROP TYPE "public"."SubPlans_old";
ALTER TABLE "User" ALTER COLUMN "subscriptionPlan" SET DEFAULT 'FREE';
COMMIT;
