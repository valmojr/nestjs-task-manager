/*
  Warnings:

  - You are about to drop the `usersongoals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usersontasks` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `usersongoals` DROP FOREIGN KEY `UsersOnGoals_goalId_fkey`;

-- DropForeignKey
ALTER TABLE `usersongoals` DROP FOREIGN KEY `UsersOnGoals_userId_fkey`;

-- DropForeignKey
ALTER TABLE `usersontasks` DROP FOREIGN KEY `UsersOnTasks_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `usersontasks` DROP FOREIGN KEY `UsersOnTasks_userId_fkey`;

-- AlterTable
ALTER TABLE `task` MODIFY `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `usersongoals`;

-- DropTable
DROP TABLE `usersontasks`;

-- CreateTable
CREATE TABLE `_GoalToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GoalToUser_AB_unique`(`A`, `B`),
    INDEX `_GoalToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_goalId_fkey` FOREIGN KEY (`goalId`) REFERENCES `Goal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GoalToUser` ADD CONSTRAINT `_GoalToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Goal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GoalToUser` ADD CONSTRAINT `_GoalToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
