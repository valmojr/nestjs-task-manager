-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_goalId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_goalId_fkey` FOREIGN KEY (`goalId`) REFERENCES `goal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `_goalTouser_AB_unique` ON `_goalTouser`(`A`, `B`);
DROP INDEX `_GoalToUser_AB_unique` ON `_goaltouser`;

-- RedefineIndex
CREATE INDEX `_goalTouser_B_index` ON `_goalTouser`(`B`);
DROP INDEX `_GoalToUser_B_index` ON `_goaltouser`;
