/*
  Warnings:

  - Changed the type of `code` on the `EmailVerification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EmailVerification" DROP COLUMN "code",
ADD COLUMN     "code" INTEGER NOT NULL;
