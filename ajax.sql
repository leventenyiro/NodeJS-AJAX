-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Gép: localhost:3306
-- Létrehozás ideje: 2020. Máj 31. 20:51
-- Kiszolgáló verziója: 10.0.28-MariaDB-2+b1
-- PHP verzió: 7.3.11-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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

CREATE TABLE `raktar` (
  `id` int(11) NOT NULL,
  `nev` varchar(150) COLLATE utf8_hungarian_ci NOT NULL,
  `ar` int(11) NOT NULL,
  `keszleten` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `raktar`
--

INSERT INTO `raktar` (`id`, `nev`, `ar`, `keszleten`) VALUES
(101, 'Étkezőasztal', 30000, 1),
(100, 'Kanapé', 100000, 1),
(102, 'Ágy', 80000, 1),
(103, 'Polc', 10000, 1),
(104, 'Szekrény', 21000, 0),
(105, 'Dolgozóasztal', 20000, 1),
(106, 'Számítógép', 250000, 1),
(107, 'Laptop', 300000, 1),
(108, 'Szék', 7000, 0),
(109, 'Fiókos szekrény', 15000, 1),
(110, 'Fali állvány', 6500, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `raktar`
--
ALTER TABLE `raktar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nev_idx` (`nev`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `raktar`
--
ALTER TABLE `raktar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
