/*
  Warnings:

  - You are about to drop the column `createdAt` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `emailAddress` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `rewardsPoints` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `cityAddress` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `emailAddress` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `employeeRole` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `isCurrentlyOnShift` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `lastCheckInTime` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `stateAddress` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `streetAddress` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `orders_products` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `orders_products` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `orders_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `orders_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_1`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_2`;

-- DropForeignKey
ALTER TABLE `orders_products` DROP FOREIGN KEY `orders_products_ibfk_1`;

-- DropForeignKey
ALTER TABLE `orders_products` DROP FOREIGN KEY `orders_products_ibfk_2`;

-- AlterTable
ALTER TABLE `customers` DROP COLUMN `createdAt`,
    DROP COLUMN `emailAddress`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `phoneNumber`,
    DROP COLUMN `rewardsPoints`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `email_address` VARCHAR(500) NULL,
    ADD COLUMN `first_name` VARCHAR(100) NULL,
    ADD COLUMN `last_name` VARCHAR(100) NULL,
    ADD COLUMN `phone_number` VARCHAR(10) NULL,
    ADD COLUMN `rewards_points` INTEGER NULL DEFAULT 0,
    ADD COLUMN `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `employees` DROP COLUMN `cityAddress`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `emailAddress`,
    DROP COLUMN `employeeRole`,
    DROP COLUMN `firstName`,
    DROP COLUMN `isCurrentlyOnShift`,
    DROP COLUMN `lastCheckInTime`,
    DROP COLUMN `lastName`,
    DROP COLUMN `phoneNumber`,
    DROP COLUMN `stateAddress`,
    DROP COLUMN `streetAddress`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `city_address` VARCHAR(100) NULL,
    ADD COLUMN `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `employee_role` VARCHAR(100) NULL,
    ADD COLUMN `first_name` VARCHAR(100) NULL,
    ADD COLUMN `is_on_shift` BOOLEAN NULL,
    ADD COLUMN `last_check_in_time` DATETIME(0) NULL,
    ADD COLUMN `last_name` VARCHAR(100) NULL,
    ADD COLUMN `phone_number` VARCHAR(10) NULL,
    ADD COLUMN `state_address` VARCHAR(100) NULL,
    ADD COLUMN `street_address` VARCHAR(500) NULL,
    ADD COLUMN `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `customerId`,
    DROP COLUMN `employeeId`,
    ADD COLUMN `customer_id` INTEGER NULL,
    ADD COLUMN `employee_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `orders_products` DROP COLUMN `orderId`,
    DROP COLUMN `productId`,
    ADD COLUMN `order_id` INTEGER NOT NULL,
    ADD COLUMN `product_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `customer_id` ON `orders`(`customer_id`);

-- CreateIndex
CREATE INDEX `employee_id` ON `orders`(`employee_id`);

-- CreateIndex
CREATE INDEX `order_id` ON `orders_products`(`order_id`);

-- CreateIndex
CREATE INDEX `product_id` ON `orders_products`(`product_id`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders_products` ADD CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders_products` ADD CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products`(`sku`) ON DELETE RESTRICT ON UPDATE RESTRICT;
