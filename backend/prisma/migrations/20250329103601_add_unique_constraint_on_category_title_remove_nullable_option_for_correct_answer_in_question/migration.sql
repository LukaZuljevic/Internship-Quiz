/*
  Warnings:

  - You are about to drop the column `total_points` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Made the column `correctAnswer` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "correctAnswer" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "total_points",
ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");
