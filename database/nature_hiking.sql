-- phpMyAdmin SQL Dump
-- Hiking Sites Management System - Nature Protection Society
--
-- Database: `nature_hiking`
--
CREATE DATABASE IF NOT EXISTS `nature_hiking` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `nature_hiking`;

-- --------------------------------------------------------

--
-- Table structure for table `regions`
-- Regions table
--

CREATE TABLE `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `regions`
-- Region data
--

INSERT INTO `regions` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'North', NOW(), NOW()),
(2, 'South', NOW(), NOW()),
(3, 'Center', NOW(), NOW()),
(4, 'Lowlands', NOW(), NOW()),
(5, 'Coastal Plain', NOW(), NOW()),
(6, 'Jerusalem Area', NOW(), NOW());

-- --------------------------------------------------------

--
-- Table structure for table `hiking_sites`
-- Hiking sites table
--

CREATE TABLE `hiking_sites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `region_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `adult_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `child_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `region_id` (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hiking_sites`
-- Hiking sites sample data
--

INSERT INTO `hiking_sites` (`id`, `region_id`, `name`, `description`, `adult_price`, `child_price`, `created_at`, `updated_at`) VALUES
(1, 1, 'Tanninim Stream', 'Beautiful nature reserve with crystal clear springs. Pleasant walking trail for the whole family. Recommended to arrive early in the morning during summer. Swimming is possible in the springs. Duration: about 3 hours', 28.00, 14.00, NOW(), NOW()),
(2, 1, 'Stalactite Cave', 'Spectacular cave with stalactites and unique rock formations. Cave tour is guided. Bring warm clothes - it is cold in the cave! No option to exit mid-tour', 62.00, 31.00, NOW(), NOW()),
(3, 1, 'Banias National Park', 'Spectacular waterfall and lush vegetation. Short trail accessible to everyone. Option for a longer route. Highly recommended in spring when the waterfall is at its peak', 29.00, 15.00, NOW(), NOW()),
(4, 2, 'Ramon Crater', 'Huge and spectacular crater - a rare geological phenomenon in the world. Many hiking trails of different lengths. Recommended to hike with a guide. Bring plenty of water! Camping is allowed in the crater', 0.00, 0.00, NOW(), NOW()),
(5, 2, 'Ein Gedi', 'Nature reserve with waterfalls and natural pools. Pleasant and cool hike. Marked trails. Recommended to arrive early. Beware of ibexes that steal things!', 29.00, 15.00, NOW(), NOW()),
(6, 2, 'Coral Beach', 'Amazing coral reef reserve. Snorkeling in the Red Sea. Spectacular underwater views. Bring your own snorkeling equipment. Highly recommended for diving', 0.00, 0.00, NOW(), NOW()),
(7, 3, 'Ben Shemen Forest', 'Pleasant forest for cycling and walking. Well-marked trails. Very suitable for children. Picnic tables available. Recommended in autumn and spring', 0.00, 0.00, NOW(), NOW()),
(8, 4, 'Tel Gezer', 'Important archaeological site. Spectacular view from the top of the hill. You can see the ancient Canaanite altar. Short and easy hike. Bring a hat - no shade!', 14.00, 7.00, NOW(), NOW()),
(9, 5, 'Palmachim Beach', 'Coastal reserve with beautiful sand dunes. Sea turtles lay eggs on the beach. Walking trails on the dunes. Swimming in the sea is also possible. Recommended at sunset', 0.00, 0.00, NOW(), NOW()),
(10, 6, 'Ein Hemed', 'Nature reserve with a beautiful spring and ancient plane trees. Short and pleasant trail. Very suitable for young children. Picnic tables available. Recommended year-round', 22.00, 11.00, NOW(), NOW()),
(11, 6, 'Mount Giloh Viewpoint', 'Spectacular viewpoint overlooking Jerusalem. You can see the Old City. Bike trails in the forest. Recommended to come at the end of the day for sunset', 0.00, 0.00, NOW(), NOW()),
(12, 1, 'Korazim National Park', 'Ancient village with 3rd century synagogue. Spectacular black mosaics. Stunning view of the Sea of Galilee. Short hike. Bring water and a hat', 22.00, 11.00, NOW(), NOW());

-- --------------------------------------------------------

--
-- Constraints for table `hiking_sites`
-- Foreign key relationships
--

ALTER TABLE `hiking_sites`
  ADD CONSTRAINT `hiking_sites_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

