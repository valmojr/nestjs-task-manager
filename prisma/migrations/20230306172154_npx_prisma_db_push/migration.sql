-- AlterTable
ALTER TABLE `task` ADD COLUMN `dueDate` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `SubTask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `dueDate` DATETIME(3) NULL,
    `taskId` INTEGER NOT NULL,
    `status` ENUM('not_assigned', 'pending', 'done', 'stuck', 'cancelled') NOT NULL DEFAULT 'pending',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubTask` ADD CONSTRAINT `SubTask_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
