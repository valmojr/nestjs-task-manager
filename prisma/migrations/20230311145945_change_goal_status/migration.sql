/*
  Warnings:

  - You are about to alter the column `status` on the `Goal` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "status" INTEGER DEFAULT 0,
    "dueDate" DATETIME
);
INSERT INTO "new_Goal" ("description", "dueDate", "id", "image", "status", "title") SELECT "description", "dueDate", "id", "image", "status", "title" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
