CREATE DATABASE IF NOT EXISTS `dev_teams_meetings` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dev_teams_meetings`;

CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `teams` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Team UI', NOW(), NOW()),
(2, 'Team Mobile', NOW(), NOW()),
(3, 'Team React', NOW(), NOW()),
(4, 'Team Backend', NOW(), NOW()),
(5, 'Team DevOps', NOW(), NOW()),
(6, 'Team QA', NOW(), NOW());

CREATE TABLE `meetings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_id` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `description` text NOT NULL,
  `room` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `meetings` (`id`, `team_id`, `start_time`, `end_time`, `description`, `room`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-11-05 09:00:00', '2025-11-05 10:00:00', 'UI/UX Design Review - Discussing new dashboard layouts and user feedback', 'Blue Room', NOW(), NOW()),
(2, 1, '2025-11-05 14:00:00', '2025-11-05 15:30:00', 'Sprint Planning - Planning next two weeks of UI development', 'New York Room', NOW(), NOW()),
(3, 2, '2025-11-05 10:00:00', '2025-11-05 11:00:00', 'iOS App Architecture Discussion', 'Large Board Room', NOW(), NOW()),
(4, 2, '2025-11-06 09:00:00', '2025-11-06 10:30:00', 'Android Performance Optimization', 'Blue Room', NOW(), NOW()),
(5, 3, '2025-11-05 11:00:00', '2025-11-05 12:00:00', 'React State Management Best Practices', 'New York Room', NOW(), NOW()),
(6, 3, '2025-11-05 15:00:00', '2025-11-05 16:00:00', 'Code Review Session - Component Refactoring', 'Blue Room', NOW(), NOW()),
(7, 4, '2025-11-05 09:30:00', '2025-11-05 10:30:00', 'API Design Discussion - RESTful vs GraphQL', 'Large Board Room', NOW(), NOW()),
(8, 4, '2025-11-06 14:00:00', '2025-11-06 15:00:00', 'Database Optimization Strategies', 'New York Room', NOW(), NOW()),
(9, 5, '2025-11-05 13:00:00', '2025-11-05 14:00:00', 'CI/CD Pipeline Review', 'Blue Room', NOW(), NOW()),
(10, 6, '2025-11-05 10:00:00', '2025-11-05 11:30:00', 'Test Automation Framework Discussion', 'Large Board Room', NOW(), NOW());

ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

