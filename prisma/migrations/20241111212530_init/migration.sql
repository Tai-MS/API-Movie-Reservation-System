/*
  Warnings:

  - You are about to alter the column `date` on the `calendar` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `time` on the `calendar` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_lifetime` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `calendar` MODIFY `date` DATETIME NOT NULL,
    MODIFY `time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `token` VARCHAR(255) NOT NULL,
    ADD COLUMN `token_lifetime` DATETIME NOT NULL;
