-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           10.5.3-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Listage des données de la table otter_worlds.article : ~14 rows (environ)
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`idArticle`, `title`, `content`, `thumbnail`, `subTopic_idSubTopic`) VALUES
	(1, 'Les Cité', 'les cite de la cote de l\'epee sont tres impressionannte', 'hdjfg.jsp', 4),
	(2, 'never winter', 'never winter est la capital du monde connues', 'neverwinter.png', 4),
	(3, 'les mechant', 'les mechants sont pas gentils', 'mechant.rpg', NULL),
	(4, 'le temple de baldurs gate', 'ce temple est dédier a zafriel l\'ange dechu qui est devenu un genral whalla c\'est chaud mon pote', 'temple.jpg', 7),
	(5, 'La porte de Baldur', 'La porte de Baldur est l\'une des plus imposante cite de la cote de l\'epee et est connus pour etre le temoin d\'evenement obscur', 'Baldurs gate', 4),
	(6, 'welcome to barovia', 'La barovie ce n\'est pas un endroit ou je voudrais passé mes vacance', 'Stradh.jpg', 6),
	(7, 'the sword coast', 'La cote de l\'épée est le coeur de la civilisation humaine dans la triste region des royaumes oublié', 'swordCoast.png', 4),
	(8, 'The cruel leader', 'he is the cruel leader of the terrible wild hunt', 'badguy.jpg', 11),
	(9, 'the fist balade', 'do re mi fa sol al si do re mi fa fa mi re do', 'partition.png', 10),
	(10, 'the second balade', 'it\'s a beautifull song sing by the most impressive bard you will ever see', 'partition2.png', 10),
	(11, 'the emperor', 'the uncontested leader of the powerfull and conquestfull nilfgardien empire', 'emperor.jpg', 9),
	(12, 'the cult', 'the cult of the eternal fire is a very influancial cult', 'flame', 8),
	(13, 'house', 'it\'s a house, for poney', 'poney', 1),
	(14, 'warior', 'it\'s a poney with an armor that shout lazer with his eyes ', NULL, 3);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.character : ~6 rows (environ)
/*!40000 ALTER TABLE `character` DISABLE KEYS */;
INSERT INTO `character` (`idCharacter`, `name`, `backstory`, `bIsDead`, `bIsSheetCompleted`, `user_idUser`, `universe_idUniverse`) VALUES
	(1, 'Eozen Thelir Daragon', 'A strange warrior who lost his memory and a bad guy', 0, 0, 1, 4),
	(2, 'Le faurain', 'He come from a demon and patate his enemies', 0, 0, 4, 4),
	(3, 'ConnArgonien', 'A very friendly reptile', 0, 0, 2, 4),
	(4, 'François', 'Just François in is own universe', 0, 0, 3, 4),
	(5, 'Jeskia', 'A original bard', 0, 0, 3, 2),
	(6, 'Smith', 'A very very respectable priest', 0, 0, 2, 2);
/*!40000 ALTER TABLE `character` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.characteringroup : ~3 rows (environ)
/*!40000 ALTER TABLE `characteringroup` DISABLE KEYS */;
INSERT INTO `characteringroup` (`group_idGroup`, `character_idCharacter`) VALUES
	(1, 1),
	(3, 2),
	(4, 5);
/*!40000 ALTER TABLE `characteringroup` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.event : ~5 rows (environ)
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` (`idEvent`, `name`, `year`, `month`, `day`, `description`, `article_idArticle`, `timeline_idTimeline`) VALUES
	(1, 'the battle of the fist hell', -125, 10, 6, 'the fist batle of the war', NULL, 1),
	(2, 'the fall of zafriel', 250, 12, 14, 'this event shaped the world for ever', NULL, 1),
	(3, 'the walk of asmodeus', 100, 8, 10, 'the wrath of asmodeus was emesearuble', NULL, 1),
	(4, 'the first horse', 120, 12, 11, 'before the world was quite empty', NULL, 2),
	(5, 'the fist poney', 240, NULL, NULL, 'poney are so much cooler than horses', NULL, 2);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.group : ~9 rows (environ)
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` (`idGroup`, `name`, `universe_idUniverse`) VALUES
	(3, 'Asimar', 4),
	(4, 'bard', 2),
	(10, 'heretic', 3),
	(1, 'Hero', 4),
	(9, 'horse', 1),
	(5, 'marchant', 2),
	(8, 'shetland', 1),
	(2, 'sorceler', 2),
	(7, 'witch', 2);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.interestpoint : ~8 rows (environ)
/*!40000 ALTER TABLE `interestpoint` DISABLE KEYS */;
INSERT INTO `interestpoint` (`idInterestPoint`, `name`, `coordinate`, `map_idMap`, `article_idArticle`) VALUES
	(1, 'the academy', '(125,12)', 1, NULL),
	(2, 'temple of the seven ', '(0, 0)', 1, NULL),
	(3, 'the palace', '(112, -85)', 1, NULL),
	(4, 'the paciflore', '(6, 9)', 2, NULL),
	(5, 'tavern', '(84, 56)', 2, NULL),
	(6, 'poney field', '(120, 156)', 3, NULL),
	(7, 'poney castle', '(140, 156)', 3, NULL),
	(8, 'heretic houses', '(20, 20)', 4, NULL);
/*!40000 ALTER TABLE `interestpoint` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.inventory : ~4 rows (environ)
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` (`idInventory`, `name`, `number`, `description`, `weight`, `character_idCharacter`) VALUES
	(1, 'Torch', 3, 'Torch to light the dark', 0.50, 1),
	(2, 'Rope', 10, 'number = meter; weight = 2 * meter', 20.00, 1),
	(3, 'Sword prout', 189, 'Dealing +4 prout damage', 4.00, 1),
	(7, 'my super cool item but different 3', 1, 'un item vraiment cool', 1854.00, 1);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.keyword : ~7 rows (environ)
/*!40000 ALTER TABLE `keyword` DISABLE KEYS */;
INSERT INTO `keyword` (`idKeyword`, `name`, `universe_idUniverse`) VALUES
	(4, 'donjon', 4),
	(1, 'dragon', 4),
	(2, 'lore', 4),
	(6, 'poney', 1),
	(5, 'sun sword', 4),
	(3, 'war', 3),
	(7, 'witcher', 2);
/*!40000 ALTER TABLE `keyword` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.keywordarticle : ~5 rows (environ)
/*!40000 ALTER TABLE `keywordarticle` DISABLE KEYS */;
INSERT INTO `keywordarticle` (`keyword_idKeyword`, `article_idArticle`) VALUES
	(1, 1),
	(5, 5),
	(5, 6),
	(6, 13),
	(7, 10);
/*!40000 ALTER TABLE `keywordarticle` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.map : ~4 rows (environ)
/*!40000 ALTER TABLE `map` DISABLE KEYS */;
INSERT INTO `map` (`idMap`, `name`, `universe_idUniverse`, `article_idArticle`) VALUES
	(1, 'neverwinter', 4, 2),
	(2, 'novigrad', 2, NULL),
	(3, 'poneyland', 1, NULL),
	(4, 'heretic land', 3, NULL);
/*!40000 ALTER TABLE `map` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.session : ~4 rows (environ)
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` (`sid`, `session`, `lastSeen`) VALUES
	('7i7ITewklyZpUG6Uj3IcFDk6IV1UlAGY', '{"cookie":{"originalMaxAge":86399996,"expires":"2020-12-07T22:17:57.792Z","httpOnly":true,"path":"/"},"idUser":3}', '2020-12-06 23:17:57'),
	('M7evejs-X-2CBLa0cs_SqcPiXX2v6HrO', '{"cookie":{"originalMaxAge":86399999,"expires":"2020-12-06T22:28:52.801Z","httpOnly":true,"path":"/"},"idUser":1}', '2020-12-05 23:28:52'),
	('SUs-oEVjCNvS3c1O_IVf3-dmL16O7vB8', '{"cookie":{"originalMaxAge":86400000,"expires":"2020-12-08T10:26:05.746Z","httpOnly":true,"path":"/"},"idUser":3}', '2020-12-07 11:26:05'),
	('Y-hi1KRWOylWhJTPCD0AWafX5UVQ6mAA', '{"cookie":{"originalMaxAge":86400000,"expires":"2020-12-08T13:09:09.483Z","httpOnly":true,"path":"/"},"idUser":3}', '2020-12-07 14:09:09');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;

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

-- Listage des données de la table otter_worlds.subtopic : ~9 rows (environ)
/*!40000 ALTER TABLE `subtopic` DISABLE KEYS */;
INSERT INTO `subtopic` (`idSubTopic`, `name`, `order`, `topic_idTopic`, `article_idArticle`) VALUES
	(1, 'poney house', 1, 3, NULL),
	(3, 'poney warior', 2, 3, NULL),
	(4, 'la cote de l\'epee', 1, 7, NULL),
	(6, 'Barovia', 2, 7, 6),
	(7, 'Le culte de zafriel', 1, 6, 4),
	(8, 'the eternal fire', 1, 17, NULL),
	(9, 'nilfgaar', 2, 17, NULL),
	(10, 'jaskie the bard', 1, 15, NULL),
	(11, 'the ice knights', 1, 16, 3);
/*!40000 ALTER TABLE `subtopic` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.templatecategory : ~4 rows (environ)
/*!40000 ALTER TABLE `templatecategory` DISABLE KEYS */;
INSERT INTO `templatecategory` (`idTemplateCategory`, `name`, `order`, `universe_idUniverse`) VALUES
	(1, 'Characteristics', 2, 4),
	(2, 'Description', 1, 4),
	(3, 'Skills', 3, 4),
	(5, 'test', 4, 4);
/*!40000 ALTER TABLE `templatecategory` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.templatestat : ~14 rows (environ)
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
	(13, 'Sword (2-h)', 1, 0, 3),
	(14, 'prout qui pue', 1, 1, 1);
/*!40000 ALTER TABLE `templatestat` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.timeline : ~2 rows (environ)
/*!40000 ALTER TABLE `timeline` DISABLE KEYS */;
INSERT INTO `timeline` (`idTimeline`, `name`, `description`, `bIsPublic`, `universe_idUniverse`) VALUES
	(1, 'the war of the nine hell', 'this timeline resume the event that occured during the long war of the nine hell', 1, 4),
	(2, 'the age of the horses', 'the event that happened in the legendary ages of the horses', 1, 1);
/*!40000 ALTER TABLE `timeline` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.topic : ~8 rows (environ)
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` (`idTopic`, `name`, `order`, `universe_idUniverse`, `article_idArticle`) VALUES
	(3, 'poney Land', 1, 1, NULL),
	(6, 'Religions', 2, 4, NULL),
	(7, 'les royaumes oublier', 1, 4, NULL),
	(15, 'the human', 1, 2, NULL),
	(16, 'the wild hunt', 2, 2, 3),
	(17, 'faction and power', 3, 2, NULL),
	(18, 'war', 1, 3, NULL),
	(19, 'hammer', 2, 3, NULL);
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.universe : ~5 rows (environ)
/*!40000 ALTER TABLE `universe` DISABLE KEYS */;
INSERT INTO `universe` (`idUniverse`, `name`, `description`, `bIsPublic`, `user_idUser`) VALUES
	(1, 'My little Poney', 'Wonderful world with a lot of magical poney', 1, 4),
	(2, 'The Witcher', 'Dark world with beasts and magic', 0, 1),
	(3, 'Warhammer', 'Chaotic world with wars and heretics', 1, 2),
	(4, 'Dungeons and dragons', 'Medieval fantasy world with epic quests', 1, 3),
	(5, 'Unity', 'a mix of fantasy post apocaliptic and weird scify', 1, 3);
/*!40000 ALTER TABLE `universe` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.user : ~4 rows (environ)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`idUser`, `username`, `password`) VALUES
	(1, 'Eddy', 'edypaswor'),
	(2, 'Hugues', 'hugespaword'),
	(3, 'François', 'françoispwd'),
	(4, 'Paul', 'paulsword');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.userinvitation : ~5 rows (environ)
/*!40000 ALTER TABLE `userinvitation` DISABLE KEYS */;
INSERT INTO `userinvitation` (`user_idUser`, `universe_idUniverse`, `bIsGM`) VALUES
	(1, 4, 1),
	(2, 2, 0),
	(2, 4, 0),
	(3, 2, 0),
	(4, 4, 0);
/*!40000 ALTER TABLE `userinvitation` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
