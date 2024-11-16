/*
  Warnings:

  - You are about to alter the column `date` on the `calendar` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `time` on the `calendar` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The values [NOT_SHOWING] on the enum `Movie_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [DISABLE] on the enum `Room_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `capacity` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacityStatus` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `movie` DROP FOREIGN KEY `Movie_calendar_id_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_calendar_id_fkey`;

-- AlterTable
ALTER TABLE `calendar` MODIFY `date` DATETIME NOT NULL,
    MODIFY `time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `movie` MODIFY `calendar_id` INTEGER NULL,
    MODIFY `status` ENUM('TO_SHOW', 'SHOWING', 'STOP_SHOWING', 'UNAVAILABLE') NOT NULL;

-- AlterTable
ALTER TABLE `room` ADD COLUMN `capacity` INTEGER NOT NULL,
    ADD COLUMN `capacityStatus` ENUM('EMPTY', 'HALF_EMPTY', 'FULL') NOT NULL,
    MODIFY `calendar_id` INTEGER NULL,
    MODIFY `status` ENUM('AVAILABLE', 'UNAVAILABLE') NOT NULL;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_calendar_id_fkey` FOREIGN KEY (`calendar_id`) REFERENCES `Calendar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_calendar_id_fkey` FOREIGN KEY (`calendar_id`) REFERENCES `Calendar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
