/*
  Warnings:

  - You are about to drop the column `is_on_shift` on the `employees` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_address]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Made the column `customer_id` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employee_id` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_1`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_2`;

-- AlterTable
ALTER TABLE `employees` DROP COLUMN `is_on_shift`,
    ADD COLUMN `is_currently_on_shift` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `customer_id` INTEGER NOT NULL,
    MODIFY `employee_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `customers_phone_number_key` ON `customers`(`phone_number`);

-- CreateIndex
CREATE UNIQUE INDEX `customers_email_address_key` ON `customers`(`email_address`);

-- CreateIndex
CREATE UNIQUE INDEX `employees_phone_number_key` ON `employees`(`phone_number`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
