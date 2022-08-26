-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_2`;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
