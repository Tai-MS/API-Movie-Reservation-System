/*
  Warnings:

  - You are about to alter the column `date` on the `calendar` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `time` on the `calendar` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `capacityStatus` on the `room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `calendar` MODIFY `date` DATETIME NOT NULL,
    MODIFY `time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `capacityStatus`,
    ADD COLUMN `freeSits` INTEGER NOT NULL DEFAULT 0,
    MODIFY `status` ENUM('AVAILABLE', 'UNAVAILABLE', 'MAINTENANCE') NOT NULL;
