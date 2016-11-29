SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema veranda
-- -----------------------------------------------------
-- Veranda QA platform - CSC 309 project
--
DROP SCHEMA IF EXISTS `veranda` ;

-- -----------------------------------------------------
-- Schema veranda
--
-- Veranda QA platform - CSC 309 project
--
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `veranda` DEFAULT CHARACTER SET utf8 ;
USE `veranda` ;

-- -----------------------------------------------------
-- Table `veranda`.`Account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`Account` ;

CREATE TABLE IF NOT EXISTS `veranda`.`Account` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE KEY,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`account_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`Course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`Course` ;

CREATE TABLE IF NOT EXISTS `veranda`.`Course` (
  `course_id` INT NOT NULL AUTO_INCREMENT,
  `created_by` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `start_date` DATE NULL,
  `finish_date` DATE NULL,
  PRIMARY KEY (`course_id`),
  FOREIGN KEY (`created_by`)
    REFERENCES `veranda`.`Account` (`account_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`CourseInstructor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`CourseInstructor` ;

CREATE TABLE IF NOT EXISTS `veranda`.`CourseInstructor` (
  `course_id` INT NOT NULL,
  `account_id` INT NOT NULL,
  PRIMARY KEY (`course_id`, `account_id`),
  FOREIGN KEY (`course_id`)
    REFERENCES `veranda`.`Course` (`course_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`account_id`)
    REFERENCES `veranda`.`Account` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`CourseStudent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`CourseStudent` ;

CREATE TABLE IF NOT EXISTS `veranda`.`CourseStudent` (
  `course_id` INT NOT NULL,
  `account_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`course_id`, `account_id`),
  FOREIGN KEY (`course_id`)
    REFERENCES `veranda`.`Course` (`course_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`account_id`)
    REFERENCES `veranda`.`Account` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`Thread`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`Thread` ;

CREATE TABLE IF NOT EXISTS `veranda`.`Thread` (
  `thread_id` INT NOT NULL AUTO_INCREMENT,
  `created_by` INT NOT NULL,
  `course_id` INT NOT NULL,
  `is_anon` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`thread_id`),
  FOREIGN KEY (`course_id`)
    REFERENCES `veranda`.`Course` (`course_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`created_by`)
    REFERENCES `veranda`.`Account` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`Answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`Answer` ;

-- If created_by NULL, user has been deleted.

CREATE TABLE IF NOT EXISTS `veranda`.`Answer` (
  `answer_id` INT NOT NULL AUTO_INCREMENT,
  `thread_id` INT NOT NULL,
  `created_by` INT NULL,
  `content` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `is_anon` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`answer_id`),
  FOREIGN KEY (`thread_id`)
    REFERENCES `veranda`.`Thread` (`thread_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`created_by`)
    REFERENCES `veranda`.`Account` (`account_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`Comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`Comment` ;

CREATE TABLE IF NOT EXISTS `veranda`.`Comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `thread_id` INT NOT NULL,
  `created_by` INT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `is_anon` TINYINT(1) NOT NULL DEFAULT 0,
  `content` TEXT NULL,
  PRIMARY KEY (`comment_id`),
  FOREIGN KEY (`thread_id`)
    REFERENCES `veranda`.`Thread` (`thread_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`created_by`)
    REFERENCES `veranda`.`Account` (`account_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`AnswerVote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`AnswerVote` ;

CREATE TABLE IF NOT EXISTS `veranda`.`AnswerVote` (
  `answer_id` INT NOT NULL,
  `created_by` INT NOT NULL,
  PRIMARY KEY (`answer_id`, `created_by`),
  FOREIGN KEY (`answer_id`)
    REFERENCES `veranda`.`Answer` (`answer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`created_by`)
    REFERENCES `veranda`.`Account` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`ThreadVote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`ThreadVote` ;

CREATE TABLE IF NOT EXISTS `veranda`.`ThreadVote` (
  `thread_id` INT NOT NULL,
  `voted_by` INT NOT NULL,
  PRIMARY KEY (`thread_id`, `voted_by`),
  FOREIGN KEY (`thread_id`)
    REFERENCES `veranda`.`Thread` (`thread_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`voted_by`)
    REFERENCES `veranda`.`Account` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`Bulletin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`Bulletin` ;

CREATE TABLE IF NOT EXISTS `veranda`.`Bulletin` (
  `thread_id` INT NOT NULL,
  `created_by` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `instructor_message` TEXT NULL,
  PRIMARY KEY (`thread_id`, `created_by`),
  FOREIGN KEY (`thread_id`)
    REFERENCES `veranda`.`Thread` (`thread_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`created_by`)
    REFERENCES `veranda`.`Account` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`Raised`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`Raised` ;

CREATE TABLE IF NOT EXISTS `veranda`.`Raised` (
  `raised_id` INT NOT NULL AUTO_INCREMENT,
  `thread_id` INT NOT NULL,
  `created_by` INT NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `is_closed` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`raised_id`),
  FOREIGN KEY (`thread_id`)
    REFERENCES `veranda`.`Thread` (`thread_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  FOREIGN KEY (`created_by`)
    REFERENCES `veranda`.`Account` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`File`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`File` ;

CREATE TABLE IF NOT EXISTS `veranda`.`File` (
  `file_id` INT NOT NULL AUTO_INCREMENT,
  `filepath` VARCHAR(255) NOT NULL UNIQUE,
  `uploaded_by` INT NULL,
  PRIMARY KEY (`file_id`),
  FOREIGN KEY (`uploaded_by`)
    REFERENCES `veranda`.`Account` (`account_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`AnswerFile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`AnswerFile` ;

CREATE TABLE IF NOT EXISTS `veranda`.`AnswerFile` (
  `answer_id` INT NOT NULL,
  `file_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`answer_id`, `file_id`),
  FOREIGN KEY (`answer_id`)
    REFERENCES `veranda`.`Answer` (`answer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
 FOREIGN KEY (`file_id`)
    REFERENCES `veranda`.`File` (`file_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veranda`.`ThreadFile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `veranda`.`ThreadFile` ;

CREATE TABLE IF NOT EXISTS `veranda`.`ThreadFile` (
  `thread_id` INT NOT NULL,
  `file_id` INT NOT NULL,
  PRIMARY KEY (`thread_id`, `file_id`),
  FOREIGN KEY (`thread_id`)
    REFERENCES `veranda`.`Thread` (`thread_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (`file_id`)
    REFERENCES `veranda`.`File` (`file_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
