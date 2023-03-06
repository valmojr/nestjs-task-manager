-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('not_assigned', 'pending', 'done', 'stuck', 'cancelled') NOT NULL DEFAULT 'pending';
