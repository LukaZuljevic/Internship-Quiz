/*
  Warnings:

  - The values [TextArea,Checkbox,Date,Slider] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `max` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `min` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `step` on the `Question` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('Field', 'Select', 'Number', 'Match', 'Order');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "max",
DROP COLUMN "min",
DROP COLUMN "step";
