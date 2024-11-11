/*
  Warnings:

  - You are about to alter the column `date` on the `calendar` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `time` on the `calendar` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `token` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `calendar` MODIFY `date` DATETIME NOT NULL,
    MODIFY `time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `token` VARCHAR(191) NULL,
    MODIFY `token_lifetime` DATETIME(3) NULL;
