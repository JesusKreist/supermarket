-- DropForeignKey
ALTER TABLE `orders_products` DROP FOREIGN KEY `orders_products_ibfk_1`;

-- DropForeignKey
ALTER TABLE `orders_products` DROP FOREIGN KEY `orders_products_ibfk_2`;

-- AddForeignKey
ALTER TABLE `orders_products` ADD CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders_products` ADD CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products`(`sku`) ON DELETE CASCADE ON UPDATE CASCADE;
