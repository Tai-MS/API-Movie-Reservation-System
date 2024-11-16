/*
  Warnings:

  - You are about to alter the column `date` on the `calendar` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `time` on the `calendar` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `status` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `calendar` MODIFY `date` DATETIME NOT NULL,
    MODIFY `time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `movie` ADD COLUMN `status` ENUM('SHOWING', 'TO_SHOW', 'NOT_SHOWING') NOT NULL;

-- AlterTable
ALTER TABLE `room` ADD COLUMN `status` ENUM('AVAILABLE', 'DISABLE') NOT NULL;
