/*
  Warnings:

  - The `options` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "QuestionType" ADD VALUE 'Match';
ALTER TYPE "QuestionType" ADD VALUE 'Order';

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "options",
ADD COLUMN     "options" JSONB;
