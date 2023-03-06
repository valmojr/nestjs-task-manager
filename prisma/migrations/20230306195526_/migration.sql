/*
  Warnings:

  - You are about to drop the column `groupId` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `groupId`,
    ALTER COLUMN `status` DROP DEFAULT;
