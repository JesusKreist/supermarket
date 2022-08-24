/*
  Warnings:

  - A unique constraint covering the columns `[email_address]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email_address` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employees` ADD COLUMN `email_address` VARCHAR(500) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `employees_email_address_key` ON `employees`(`email_address`);
