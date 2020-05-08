-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2020. Ápr 26. 12:30
-- Kiszolgáló verziója: 5.7.23
-- PHP verzió: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `ajax`
--
CREATE DATABASE IF NOT EXISTS `ajax` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `ajax`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `raktar`
--

DROP TABLE IF EXISTS `raktar`;
CREATE TABLE IF NOT EXISTS `raktar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(150) COLLATE utf8_hungarian_ci NOT NULL,
  `ar` int(11) NOT NULL,
  `keszleten` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `raktar`
--

INSERT INTO `raktar` (`id`, `nev`, `ar`, `keszleten`) VALUES
(42, '1', 12312, 0),
(43, '2312', 12312, 1),
(44, 'dsfadf', 164001, 1),
(48, '12312', 12312, 1),
(49, 'asdd', 12312, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
