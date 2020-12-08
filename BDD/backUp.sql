-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           10.5.7-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Listage des données de la table otter_worlds.article : ~0 rows (environ)
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.character : ~6 rows (environ)
/*!40000 ALTER TABLE `character` DISABLE KEYS */;
INSERT INTO `character` (`idCharacter`, `name`, `backstory`, `bIsAlive`, `sheetStatus`, `user_idUser`, `universe_idUniverse`) VALUES
	(1, 'Eozen Thelir Daragon', 'A strange warrior who lost his memory', 1, 1, 1, 4),
	(2, 'Le faurain', 'He come from a demon and patate his enemies', 1, 1, 4, 4),
	(3, 'ConnArgonien', 'A very friendly reptile', 1, 1, 2, 4),
	(4, 'François', 'Just François in is own universe', 1, 1, 3, 4),
	(5, 'Jeskia', 'A original bard', 1, 1, 3, 2),
	(6, 'Smith', 'A very very respectable priest', 1, 1, 2, 2);
/*!40000 ALTER TABLE `character` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.characteringroup : ~0 rows (environ)
/*!40000 ALTER TABLE `characteringroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `characteringroup` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.event : ~0 rows (environ)
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.group : ~0 rows (environ)
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
/*!40000 ALTER TABLE `group` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.interestpoint : ~0 rows (environ)
/*!40000 ALTER TABLE `interestpoint` DISABLE KEYS */;
/*!40000 ALTER TABLE `interestpoint` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.inventory : ~3 rows (environ)
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` (`idInventory`, `name`, `number`, `description`, `weight`, `character_idCharacter`) VALUES
	(1, 'Torch', 3, 'Torch to light the dark', 0.50, 1),
	(2, 'Rope', 10, 'number = meter; weight = 2 * meter', 20.00, 1),
	(3, 'Sword', 1, 'Dealing +4 damage', 4.00, 1);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.keyword : ~0 rows (environ)
/*!40000 ALTER TABLE `keyword` DISABLE KEYS */;
/*!40000 ALTER TABLE `keyword` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.map : ~0 rows (environ)
/*!40000 ALTER TABLE `map` DISABLE KEYS */;
/*!40000 ALTER TABLE `map` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.stat : ~12 rows (environ)
/*!40000 ALTER TABLE `stat` DISABLE KEYS */;
INSERT INTO `stat` (`value`, `character_idCharacter`, `templateStat_idTemplateStat`) VALUES
	('5', 1, 1),
	('4', 1, 2),
	('Eozen Thelir Daragon', 1, 3),
	('Human', 1, 4),
	('H', 1, 5),
	('100', 1, 6),
	('11', 1, 7),
	('14', 1, 8),
	('7', 1, 9),
	('15', 1, 10),
	('13', 1, 12),
	('2', 1, 13);
/*!40000 ALTER TABLE `stat` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.subtopic : ~2 rows (environ)
/*!40000 ALTER TABLE `subtopic` DISABLE KEYS */;
INSERT INTO `subtopic` (`idSubTopic`, `name`, `order`, `topic_idTopic`, `article_idArticle`) VALUES
	(1, '[OTTERWORLDS-SUBTOPIC-SYSTEM]', 0, 1, NULL),
	(2, '[OTTERWORLDS-SUBTOPIC-SYSTEM]', 0, 2, NULL),
	(3, '[OTTERWORLDS-SUBTOPIC-SYSTEM]', 0, 3, NULL),
	(4, '[OTTERWORLDS-SUBTOPIC-SYSTEM]', 0, 4, NULL),
	(5, 'The shire', 1, 5, NULL),
	(6, 'Mordor', 2, 5, NULL);
/*!40000 ALTER TABLE `subtopic` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.templatecategory : ~3 rows (environ)
/*!40000 ALTER TABLE `templatecategory` DISABLE KEYS */;
INSERT INTO `templatecategory` (`idTemplateCategory`, `name`, `order`, `universe_idUniverse`) VALUES
	(1, 'Characteristics', 2, 4),
	(2, 'Description', 1, 4),
	(3, 'Skills', 3, 4);
/*!40000 ALTER TABLE `templatecategory` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.templatestat : ~13 rows (environ)
/*!40000 ALTER TABLE `templatestat` DISABLE KEYS */;
INSERT INTO `templatestat` (`idTemplateStat`, `name`, `bIsNumber`, `bIsRequired`, `templateCategory_idTemplateCategory`) VALUES
	(1, 'Run', 1, 0, 3),
	(2, 'Jump', 1, 0, 3),
	(3, 'Name', 0, 1, 2),
	(4, 'Race', 0, 1, 2),
	(5, 'Sex', 0, 1, 2),
	(6, 'Age', 1, 1, 2),
	(7, 'INT', 1, 1, 1),
	(8, 'DEX', 1, 1, 1),
	(9, 'Sword (1-h)', 1, 0, 3),
	(10, 'STR', 1, 1, 1),
	(11, 'Kingdom', 0, 0, 2),
	(12, 'CHA', 1, 1, 1),
	(13, 'Sword (2-h)', 1, 0, 3);
/*!40000 ALTER TABLE `templatestat` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.timeline : ~0 rows (environ)
/*!40000 ALTER TABLE `timeline` DISABLE KEYS */;
/*!40000 ALTER TABLE `timeline` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.topic : ~2 rows (environ)
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` (`idTopic`, `name`, `order`, `universe_idUniverse`, `article_idArticle`) VALUES
	(1, '[OTTERWORLDS-TOPIC-SYSTEM]', 0, 1, NULL),
	(2, '[OTTERWORLDS-TOPIC-SYSTEM]', 0, 2, NULL),
	(3, '[OTTERWORLDS-TOPIC-SYSTEM]', 0, 3, NULL),
	(4, '[OTTERWORLDS-TOPIC-SYSTEM]', 0, 4, NULL),
	(5, 'Royaumes', 1, 1, NULL),
	(6, 'Religions', 2, 1, NULL);
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.universe : ~4 rows (environ)
/*!40000 ALTER TABLE `universe` DISABLE KEYS */;
INSERT INTO `universe` (`idUniverse`, `name`, `description`, `bIsPublic`, `user_idUser`) VALUES
	(1, 'My little Poney', 'Wonderful world with a lot of magical poney', 1, 4),
	(2, 'The Witcher', 'Dark world with beasts and magic', 0, 1),
	(3, 'Warhammer', 'Chaotic world with wars and heretics', 1, 2),
	(4, 'Dungeons and dragons', 'Medieval fantasy world with epic quests', 1, 3);
/*!40000 ALTER TABLE `universe` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.user : ~4 rows (environ)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`idUser`, `username`, `password`) VALUES
	(1, 'Eddy', 'edypaswor'),
	(2, 'Hugues', 'hugespaword'),
	(3, 'François', 'françoispwd'),
	(4, 'Paul', 'paulsword');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.userinvitation : ~2 rows (environ)
/*!40000 ALTER TABLE `userinvitation` DISABLE KEYS */;
INSERT INTO `userinvitation` (`user_idUser`, `universe_idUniverse`, `bIsGM`) VALUES
	(2, 2, 0),
	(3, 2, 0);
/*!40000 ALTER TABLE `userinvitation` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
