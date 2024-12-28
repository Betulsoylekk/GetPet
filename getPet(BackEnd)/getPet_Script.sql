CREATE DATABASE  IF NOT EXISTS `getpet_directory`;
USE `getpet_directory`;


DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `post`;
DROP TABLE IF EXISTS `likes`;
DROP TABLE IF EXISTS `notification`;
DROP TABLE IF EXISTS `comment`;
DROP TABLE IF EXISTS `messages`;



--
-- Table structure for getpet
--


CREATE TABLE `user` (
                        `user_id` BIGINT NOT NULL AUTO_INCREMENT,
                        `first_name` varchar(50) NOT NULL,
                        `last_name` varchar(50) NOT NULL,
                        `user_name` varchar(50) NOT NULL,
                        `password` varchar(50) NOT NULL,
                        `email` varchar(50) NOT NULL,
                        `role` varchar(50) NOT NULL,
                        PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `post` (
                        `post_id` BIGINT NOT NULL AUTO_INCREMENT,
                        `title` VARCHAR(50) NOT NULL,
                        `content` varchar(250) NOT NULL,
                        `user_id` BIGINT NOT NULL,
                        `like_count` BIGINT NOT NULL,
                        `post_type` VARCHAR(50) NOT NULL,
                        `city` VARCHAR(50),
                        `age` int,
                        `kind` VARCHAR(50),
                        `start_date` DATE,
                        `end_date` DATE,
                        `price` float,
                        `creation_time` TIMESTAMP NOT NULL,
                        `special_needs` VARCHAR(50),
                        `photo_path` VARCHAR(250),
                        `topic` VARCHAR(50),
                        PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `notification` (
                                `notification_id` BIGINT NOT NULL AUTO_INCREMENT,
                                `message` VARCHAR(100) NOT NULL,
                                `post_id` BIGINT NOT NULL,
                                `creation_time` TIMESTAMP NOT NULL,
                                `user_id` BIGINT NOT NULL,
                                PRIMARY KEY (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `likes` (
                         `like_id` BIGINT NOT NULL AUTO_INCREMENT,
                         `post_id` BIGINT NOT NULL,
                         `user_id` BIGINT NULL,
                         PRIMARY KEY (`like_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE comment (
                         comment_id    bigint auto_increment primary key,
                         post_id       bigint       not null,
                         user_id       bigint       not null,
                         text          varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         creation_time timestamp    not null
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Messages`(
                           `message_id` BIGINT NOT NULL AUTO_INCREMENT,
                           `sender_id` BIGINT NOT NULL,
                           `receiver_id` BIGINT NOT NULL,
                           `message_text` VARCHAR(150) NOT NULL,
                           `creation_time` TIMESTAMP NOT NULL,
                           PRIMARY KEY (`message_id`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;




--
-- Inserting data for tables
--

INSERT INTO `user`
VALUES
    (1,'firstname1','lastname1','user1','test123','email1','user'),
    (2,'firstname2','lastname2','user2','test123','email2','user'),
    (3,'firstname3','lastname3','user3','test123','email3','user'),
    (4,'firstname4','lastname4','user4','test123','email4','user'),
    (5,'firstname5','lastname5','user5','test123','email5','user'),
    (6,'firstname6','lastname6','user6','test123','email6','admin');





INSERT INTO `post`
VALUES
    (1,'title1','content1',1,0,'question',null,null,'other',null,null,null,'1971-01-01 00:00:01',null,null,null),
    (2,'title2','content2',2,0,'question',null,null,'cat',null,null,null,'1972-01-01 00:00:01',null,null,null),
    (3,'title3','content3',1,0,'question',null,null,'dog',null,null,null,'1973-01-01 00:00:01',null,null,null),
    (4,'title4','content4',3,0,'adoption','izmir',7,'cat',null,null,null,'1974-01-01 00:00:01','specialneeds1',null,null),
    (5,'title5','content5',2,0,'adoption','istanbul',7,'other',null,null,null,'1975-01-01 00:00:01','specialneeds2',null,null),
    (6,'title6','content6',1,0,'adoption','izmir',7,'dog',null,null,null,'1976-01-01 00:00:01','specialneeds3',null,null);










