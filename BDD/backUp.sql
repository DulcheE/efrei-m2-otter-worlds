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

-- Listage des données de la table otter_worlds.character : ~0 rows (environ)
/*!40000 ALTER TABLE `character` DISABLE KEYS */;
INSERT INTO `character` (`idCharacter`, `name`, `backstory`, `user_idUser`, `universe_idUniverse`) VALUES
	(1, 'Eozen Thelir Daragon', 'A strange warrior who lost his memory', 1, 4);
/*!40000 ALTER TABLE `character` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.event : ~0 rows (environ)
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.interestpoint : ~0 rows (environ)
/*!40000 ALTER TABLE `interestpoint` DISABLE KEYS */;
/*!40000 ALTER TABLE `interestpoint` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.inventory : ~0 rows (environ)
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.keyword : ~0 rows (environ)
/*!40000 ALTER TABLE `keyword` DISABLE KEYS */;
/*!40000 ALTER TABLE `keyword` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.keywordarticle : ~0 rows (environ)
/*!40000 ALTER TABLE `keywordarticle` DISABLE KEYS */;
/*!40000 ALTER TABLE `keywordarticle` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.map : ~0 rows (environ)
/*!40000 ALTER TABLE `map` DISABLE KEYS */;
/*!40000 ALTER TABLE `map` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.stat : ~0 rows (environ)
/*!40000 ALTER TABLE `stat` DISABLE KEYS */;
/*!40000 ALTER TABLE `stat` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.subtopic : ~0 rows (environ)
/*!40000 ALTER TABLE `subtopic` DISABLE KEYS */;
/*!40000 ALTER TABLE `subtopic` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.templatecategory : ~0 rows (environ)
/*!40000 ALTER TABLE `templatecategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `templatecategory` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.templatestat : ~0 rows (environ)
/*!40000 ALTER TABLE `templatestat` DISABLE KEYS */;
/*!40000 ALTER TABLE `templatestat` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.timeline : ~0 rows (environ)
/*!40000 ALTER TABLE `timeline` DISABLE KEYS */;
/*!40000 ALTER TABLE `timeline` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.topic : ~0 rows (environ)
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.universe : ~1 rows (environ)
/*!40000 ALTER TABLE `universe` DISABLE KEYS */;
INSERT INTO `universe` (`idUniverse`, `name`, `description`, `bIsPublic`, `user_idUser`) VALUES
	(1, 'My little Poney', 'Wonderful world with a lot of magical poney', 1, 4),
	(2, 'The Witcher', 'Dark world with beasts and magic', 1, 1),
	(3, 'Warhammer', 'Chaotic world with wars and heretics', 1, 2),
	(4, 'Dungeons and dragons', 'Medieval fantasy world with epic quests', 1, 3);
/*!40000 ALTER TABLE `universe` ENABLE KEYS */;

-- Listage des données de la table otter_worlds.user : ~2 rows (environ)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`idUser`, `username`, `password`) VALUES
	(1, 'Eddy', 'edypaswor'),
	(2, 'Hugues', 'hugespaword'),
	(3, 'François', 'françoispaword'),
	(4, 'Paul', 'paulsword');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
