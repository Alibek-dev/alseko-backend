
CREATE DATABASE alsekodb;
USE alsekodb;

CREATE TABLE IF NOT EXISTS `employees` (
    `id` INTEGER NOT NULL auto_increment,
    `firstName` VARCHAR(255),
    `secondName` VARCHAR(255),
    `patronymic` VARCHAR(255),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `tangibles` (
    `id` INTEGER NOT NULL auto_increment ,
    `subject` VARCHAR(255),
    `price` DOUBLE(9, 2),
    `employeeId` INTEGER,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
