/*
  Warnings:

  - You are about to alter the column `nopol` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_id_fkey`;

-- AlterTable
ALTER TABLE `car` MODIFY `nopol` INTEGER NOT NULL DEFAULT 0;
