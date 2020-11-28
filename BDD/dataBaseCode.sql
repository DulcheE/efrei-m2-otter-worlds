-- MySQL Script generated by MySQL Workbench
-- Fri Nov 27 11:12:37 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema otter_worlds
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `otter_worlds` ;

-- -----------------------------------------------------
-- Schema otter_worlds
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `otter_worlds` DEFAULT CHARACTER SET utf8 ;
USE `otter_worlds` ;

-- -----------------------------------------------------
-- Table `otter_worlds`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`universe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`universe` (
  `idUniverse` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `bIsPublic` TINYINT NOT NULL DEFAULT 1,
  `user_idUser` INT NOT NULL,
  PRIMARY KEY (`idUniverse`),
  INDEX `fk_univers_utilisateur_idx` (`user_idUser` ASC) VISIBLE,
  UNIQUE INDEX `un_idOwner_name` (`user_idUser` ASC, `name` ASC) VISIBLE,
  CONSTRAINT `fk_univers_utilisateur`
    FOREIGN KEY (`user_idUser`)
    REFERENCES `otter_worlds`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`topic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`topic` (
  `idTopic` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `order` INT NOT NULL,
  `universe_idUniverse` INT NOT NULL,
  `article_idArticle` INT NULL,
  PRIMARY KEY (`idTopic`),
  INDEX `fk_topic_universe1_idx` (`universe_idUniverse` ASC) VISIBLE,
  INDEX `fk_topic_article1_idx` (`article_idArticle` ASC) VISIBLE,
  UNIQUE INDEX `un_name_univers` (`name` ASC, `universe_idUniverse` ASC) VISIBLE,
  UNIQUE INDEX `un_order_univers` (`order` ASC, `universe_idUniverse` ASC) VISIBLE,
  CONSTRAINT `fk_topic_universe1`
    FOREIGN KEY (`universe_idUniverse`)
    REFERENCES `otter_worlds`.`universe` (`idUniverse`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_topic_article1`
    FOREIGN KEY (`article_idArticle`)
    REFERENCES `otter_worlds`.`article` (`idArticle`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`subTopic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`subTopic` (
  `idSubTopic` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `order` INT NOT NULL,
  `topic_idTopic` INT NOT NULL,
  `article_idArticle` INT NULL,
  PRIMARY KEY (`idSubTopic`),
  INDEX `fk_subTopic_topic1_idx` (`topic_idTopic` ASC) VISIBLE,
  INDEX `fk_subTopic_article1_idx` (`article_idArticle` ASC) VISIBLE,
  UNIQUE INDEX `un_name_topic` (`name` ASC, `topic_idTopic` ASC) VISIBLE,
  UNIQUE INDEX `un_oreder_topic` (`order` ASC, `topic_idTopic` ASC) VISIBLE,
  CONSTRAINT `fk_subTopic_topic1`
    FOREIGN KEY (`topic_idTopic`)
    REFERENCES `otter_worlds`.`topic` (`idTopic`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subTopic_article1`
    FOREIGN KEY (`article_idArticle`)
    REFERENCES `otter_worlds`.`article` (`idArticle`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`article` (
  `idArticle` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `thumbnail` VARCHAR(1024) NULL,
  `subTopic_idSubTopic` INT NULL,
  PRIMARY KEY (`idArticle`),
  INDEX `fk_article_subTopic1_idx` (`subTopic_idSubTopic` ASC) VISIBLE,
  UNIQUE INDEX `un_title_subTopic` (`title` ASC, `subTopic_idSubTopic` ASC) VISIBLE,
  CONSTRAINT `fk_article_subTopic1`
    FOREIGN KEY (`subTopic_idSubTopic`)
    REFERENCES `otter_worlds`.`subTopic` (`idSubTopic`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`map`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`map` (
  `idMap` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `universe_idUniverse` INT NOT NULL,
  `article_idArticle` INT NULL,
  PRIMARY KEY (`idMap`),
  INDEX `fk_maps_univers1_idx` (`universe_idUniverse` ASC) VISIBLE,
  UNIQUE INDEX `un_universe_name` (`universe_idUniverse` ASC, `name` ASC) VISIBLE,
  INDEX `fk_map_article1_idx` (`article_idArticle` ASC) VISIBLE,
  CONSTRAINT `fk_maps_univers1`
    FOREIGN KEY (`universe_idUniverse`)
    REFERENCES `otter_worlds`.`universe` (`idUniverse`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_map_article1`
    FOREIGN KEY (`article_idArticle`)
    REFERENCES `otter_worlds`.`article` (`idArticle`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`interestPoint`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`interestPoint` (
  `id_interestPoint` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `coordinate` VARCHAR(45) NOT NULL,
  `map_idMap` INT NOT NULL,
  `article_idArticle` INT NULL,
  PRIMARY KEY (`id_interestPoint`),
  INDEX `fk_interestPoint_maps1_idx` (`map_idMap` ASC) VISIBLE,
  INDEX `fk_interestPoint_article1_idx` (`article_idArticle` ASC) VISIBLE,
  UNIQUE INDEX `un_coordinate_map` (`coordinate` ASC, `map_idMap` ASC) VISIBLE,
  CONSTRAINT `fk_interestPoint_maps1`
    FOREIGN KEY (`map_idMap`)
    REFERENCES `otter_worlds`.`map` (`idMap`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_interestPoint_article1`
    FOREIGN KEY (`article_idArticle`)
    REFERENCES `otter_worlds`.`article` (`idArticle`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`character`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`character` (
  `idCharacter` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `backstory` TEXT NULL,
  `bIsDead` TINYINT NOT NULL DEFAULT 0,
  `bIsSheetCompleted` TINYINT NOT NULL DEFAULT 0,
  `user_idUser` INT NOT NULL,
  `universe_idUniverse` INT NOT NULL,
  PRIMARY KEY (`idCharacter`),
  INDEX `fk_characters_users1_idx` (`user_idUser` ASC) VISIBLE,
  INDEX `fk_characters_univers1_idx` (`universe_idUniverse` ASC) VISIBLE,
  UNIQUE INDEX `un_name_universe` (`name` ASC, `universe_idUniverse` ASC) VISIBLE,
  CONSTRAINT `fk_characters_users1`
    FOREIGN KEY (`user_idUser`)
    REFERENCES `otter_worlds`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_characters_univers1`
    FOREIGN KEY (`universe_idUniverse`)
    REFERENCES `otter_worlds`.`universe` (`idUniverse`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`templateCategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`templateCategory` (
  `idTemplateCategory` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `order` INT NOT NULL,
  `universe_idUniverse` INT NOT NULL,
  PRIMARY KEY (`idTemplateCategory`),
  INDEX `fk_templateCategory_universe1_idx` (`universe_idUniverse` ASC) VISIBLE,
  UNIQUE INDEX `un_universe_order` (`order` ASC, `universe_idUniverse` ASC) VISIBLE,
  UNIQUE INDEX `un_universe_name` (`name` ASC, `universe_idUniverse` ASC) VISIBLE,
  CONSTRAINT `fk_templateCategory_universe1`
    FOREIGN KEY (`universe_idUniverse`)
    REFERENCES `otter_worlds`.`universe` (`idUniverse`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`templateStat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`templateStat` (
  `idTemplateStat` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `bIsNumber` TINYINT NOT NULL,
  `bIsRequired` TINYINT NOT NULL DEFAULT 1,
  `templateCategory_idTemplateCategory` INT NOT NULL,
  PRIMARY KEY (`idTemplateStat`),
  INDEX `fk_templateStat_templateCategory1_idx` (`templateCategory_idTemplateCategory` ASC) VISIBLE,
  UNIQUE INDEX `un_name_idCategory` (`name` ASC, `templateCategory_idTemplateCategory` ASC) VISIBLE,
  CONSTRAINT `fk_templateStat_templateCategory1`
    FOREIGN KEY (`templateCategory_idTemplateCategory`)
    REFERENCES `otter_worlds`.`templateCategory` (`idTemplateCategory`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`stat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`stat` (
  `value` VARCHAR(45) NOT NULL DEFAULT 0,
  `character_idCharacter` INT NOT NULL,
  `templateStat_idTemplateStat` INT NOT NULL,
  INDEX `fk_stats_characters1_idx` (`character_idCharacter` ASC) VISIBLE,
  INDEX `fk_stat_templateStat1_idx` (`templateStat_idTemplateStat` ASC) VISIBLE,
  UNIQUE INDEX `un_character_templateStat` (`character_idCharacter` ASC, `templateStat_idTemplateStat` ASC) VISIBLE,
  CONSTRAINT `fk_stats_characters1`
    FOREIGN KEY (`character_idCharacter`)
    REFERENCES `otter_worlds`.`character` (`idCharacter`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_stat_templateStat1`
    FOREIGN KEY (`templateStat_idTemplateStat`)
    REFERENCES `otter_worlds`.`templateStat` (`idTemplateStat`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`inventory` (
  `idInventory` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `number` INT NOT NULL DEFAULT 1,
  `description` TEXT NOT NULL,
  `weight` DECIMAL(18,2) NOT NULL DEFAULT 0,
  `character_idCharacter` INT NOT NULL,
  PRIMARY KEY (`idInventory`),
  INDEX `fk_inventaire_characters1_idx` (`character_idCharacter` ASC) VISIBLE,
  UNIQUE INDEX `un_name_character` (`name` ASC, `character_idCharacter` ASC) VISIBLE,
  CONSTRAINT `fk_inventaire_characters1`
    FOREIGN KEY (`character_idCharacter`)
    REFERENCES `otter_worlds`.`character` (`idCharacter`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`keyword`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`keyword` (
  `idKeyword` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idKeyword`),
  UNIQUE INDEX `un_name` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`keywordArticle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`keywordArticle` (
  `keywords_idKeyword` INT NOT NULL,
  `article_idArticle` INT NOT NULL,
  INDEX `fk_keyWords_has_article_article1_idx` (`article_idArticle` ASC) VISIBLE,
  INDEX `fk_keyWords_has_article_keyWords1_idx` (`keywords_idKeyword` ASC) VISIBLE,
  UNIQUE INDEX `un_keyword_article` (`keywords_idKeyword` ASC, `article_idArticle` ASC) VISIBLE,
  CONSTRAINT `fk_keyWords_has_article_keyWords1`
    FOREIGN KEY (`keywords_idKeyword`)
    REFERENCES `otter_worlds`.`keyword` (`idKeyword`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_keyWords_has_article_article1`
    FOREIGN KEY (`article_idArticle`)
    REFERENCES `otter_worlds`.`article` (`idArticle`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`timeline`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`timeline` (
  `idTimeline` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TINYTEXT NULL,
  `bIsPublic` TINYINT NOT NULL DEFAULT 1,
  `universe_idUniverse` INT NOT NULL,
  PRIMARY KEY (`idTimeline`),
  INDEX `fk_timeline_universe1_idx` (`universe_idUniverse` ASC) VISIBLE,
  UNIQUE INDEX `un_name_universe` (`name` ASC, `universe_idUniverse` ASC) VISIBLE,
  CONSTRAINT `fk_timeline_universe1`
    FOREIGN KEY (`universe_idUniverse`)
    REFERENCES `otter_worlds`.`universe` (`idUniverse`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`event` (
  `idEvent` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `year` INT NOT NULL,
  `month` INT NULL,
  `day` INT NULL,
  `description` VARCHAR(500) NULL,
  `article_idArticle` INT NULL,
  `timeline_idTimeline` INT NOT NULL,
  PRIMARY KEY (`idEvent`),
  INDEX `fk_event_timeline1_idx` (`timeline_idTimeline` ASC) VISIBLE,
  INDEX `fk_event_article1_idx` (`article_idArticle` ASC) VISIBLE,
  UNIQUE INDEX `un_name_timeline` (`name` ASC, `timeline_idTimeline` ASC) VISIBLE,
  UNIQUE INDEX `un_date_timeline` (`timeline_idTimeline` ASC, `year` ASC, `month` ASC, `day` ASC) VISIBLE,
  CONSTRAINT `fk_event_timeline1`
    FOREIGN KEY (`timeline_idTimeline`)
    REFERENCES `otter_worlds`.`timeline` (`idTimeline`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_article1`
    FOREIGN KEY (`article_idArticle`)
    REFERENCES `otter_worlds`.`article` (`idArticle`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`userInvitation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`userInvitation` (
  `user_idUser` INT NOT NULL,
  `universe_idUniverse` INT NOT NULL,
  `bIsGM` TINYINT NOT NULL DEFAULT 0,
  INDEX `fk_userInvitation_user1_idx` (`user_idUser` ASC) VISIBLE,
  INDEX `fk_userInvitation_universe1_idx` (`universe_idUniverse` ASC) VISIBLE,
  UNIQUE INDEX `un_user_universe` (`user_idUser` ASC, `universe_idUniverse` ASC) VISIBLE,
  CONSTRAINT `fk_userInvitation_user1`
    FOREIGN KEY (`user_idUser`)
    REFERENCES `otter_worlds`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_userInvitation_universe1`
    FOREIGN KEY (`universe_idUniverse`)
    REFERENCES `otter_worlds`.`universe` (`idUniverse`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`group` (
  `idGroup` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `universe_idUniverse` INT NOT NULL,
  PRIMARY KEY (`idGroup`),
  INDEX `fk_group_universe1_idx` (`universe_idUniverse` ASC) VISIBLE,
  UNIQUE INDEX `un_name_universe` (`name` ASC, `universe_idUniverse` ASC) VISIBLE,
  CONSTRAINT `fk_group_universe1`
    FOREIGN KEY (`universe_idUniverse`)
    REFERENCES `otter_worlds`.`universe` (`idUniverse`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`characterInGroup`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`characterInGroup` (
  `group_idGroup` INT NOT NULL,
  `character_idCharacter` INT NOT NULL,
  INDEX `fk_characterInGroup_group1_idx` (`group_idGroup` ASC) VISIBLE,
  INDEX `fk_characterInGroup_character1_idx` (`character_idCharacter` ASC) VISIBLE,
  UNIQUE INDEX `un_character_group` (`group_idGroup` ASC, `character_idCharacter` ASC) VISIBLE,
  CONSTRAINT `fk_characterInGroup_group1`
    FOREIGN KEY (`group_idGroup`)
    REFERENCES `otter_worlds`.`group` (`idGroup`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_characterInGroup_character1`
    FOREIGN KEY (`character_idCharacter`)
    REFERENCES `otter_worlds`.`character` (`idCharacter`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otter_worlds`.`session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`session` (
  `sid` VARCHAR(100) NOT NULL,
  `session` VARCHAR(2048) NULL DEFAULT '{}',
  `lastSeen` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`sid`))
ENGINE = InnoDB;

USE `otter_worlds` ;

-- -----------------------------------------------------
-- Placeholder table for view `otter_worlds`.`characterStats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`characterStats` (`"character"` INT, `"category"` INT, `"stat"` INT, `value` INT, `order` INT, `bIsNumber` INT, `bIsRequired` INT, `idTemplateCategory` INT, `idTemplateStat` INT);

-- -----------------------------------------------------
-- Placeholder table for view `otter_worlds`.`userInUniverse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `otter_worlds`.`userInUniverse` (`idUser` INT, `"bIsGM"` INT, `idUniverse` INT);

-- -----------------------------------------------------
-- View `otter_worlds`.`characterStats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otter_worlds`.`characterStats`;
USE `otter_worlds`;
CREATE  OR REPLACE VIEW `characterStats` AS
	SELECT s.character_idCharacter AS "character", tc.name AS "category", ts.name AS "stat", s.value, tc.`order`, ts.bIsNumber, ts.bIsRequired, tc.idTemplateCategory, ts.idTemplateStat FROM stat s
		INNER JOIN templatestat ts ON s.templateStat_idTemplateStat = ts.idTemplateStat
		INNER JOIN templatecategory tc ON ts.templateCategory_idTemplateCategory = tc.idTemplateCategory
		ORDER BY s.character_idCharacter ASC, tc.`order` ASC, ts.bIsRequired DESC, ts.bIsNumber DESC, ts.name ASC;

-- -----------------------------------------------------
-- View `otter_worlds`.`userInUniverse`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otter_worlds`.`userInUniverse`;
USE `otter_worlds`;
CREATE  OR REPLACE VIEW `userInUniverse` AS
	SELECT idUser, MAX(bIsGM) AS "bIsGM", idUniverse FROM (
		SELECT us.idUser, 1 AS bIsGM, un.idUniverse FROM universe un
		INNER JOIN user us
			ON us.idUser = un.user_idUser
			
		UNION
		
		SELECT us.idUser, ui.bIsGM, un.idUniverse FROM user us
		INNER JOIN userInvitation ui
			ON ui.user_idUser = us.idUser
		INNER JOIN universe un 
			ON un.idUniverse = ui.universe_idUniverse
			
		UNION
		
		SELECT us.idUser, 0 AS bIsGM, un.idUniverse FROM universe un
		INNER JOIN `character` c
			ON c.universe_idUniverse = un.idUniverse
		INNER JOIN user us
			ON us.idUser = c.user_idUser
	) allUsersInUniverse
	GROUP BY idUser, idUniverse
	ORDER BY idUniverse ASC, bIsGM DESC, idUser ASC;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
