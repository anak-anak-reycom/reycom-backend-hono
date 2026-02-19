/*
  Warnings:

  - You are about to drop the column `Requirement` on the `careers` table. All the data in the column will be lost.
  - You are about to drop the column `Responbilities` on the `careers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "careers" DROP COLUMN "Requirement",
DROP COLUMN "Responbilities",
ADD COLUMN     "requirement" TEXT,
ADD COLUMN     "responbilities" TEXT;
