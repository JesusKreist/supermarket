/*
  Warnings:

  - You are about to drop the column `item` on the `products` table. All the data in the column will be lost.
  - Made the column `created_at` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email_address` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_name` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rewards_points` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city_address` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employee_role` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_name` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_check_in_time` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state_address` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `street_address` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_currently_on_shift` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `itemName` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `category` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `employee_id` ON `orders`;

-- AlterTable
ALTER TABLE `customers` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `email_address` VARCHAR(500) NOT NULL,
    MODIFY `first_name` VARCHAR(100) NOT NULL,
    MODIFY `last_name` VARCHAR(100) NOT NULL,
    MODIFY `phone_number` VARCHAR(10) NOT NULL,
    MODIFY `rewards_points` INTEGER NOT NULL DEFAULT 0,
    MODIFY `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `employees` MODIFY `city_address` VARCHAR(100) NOT NULL,
    MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `employee_role` ENUM('MANAGER', 'SUPERVISOR', 'CASHIER') NOT NULL DEFAULT 'CASHIER',
    MODIFY `first_name` VARCHAR(100) NOT NULL,
    MODIFY `last_check_in_time` DATETIME(0) NOT NULL,
    MODIFY `last_name` VARCHAR(100) NOT NULL,
    MODIFY `phone_number` VARCHAR(10) NOT NULL,
    MODIFY `state_address` VARCHAR(100) NOT NULL,
    MODIFY `street_address` VARCHAR(500) NOT NULL,
    MODIFY `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `is_currently_on_shift` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `products` DROP COLUMN `item`,
    ADD COLUMN `itemName` VARCHAR(1000) NOT NULL,
    MODIFY `category` VARCHAR(300) NOT NULL,
    MODIFY `price` DECIMAL(6, 2) NOT NULL;
