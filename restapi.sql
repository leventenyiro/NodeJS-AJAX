-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2020. Júl 27. 23:26
-- Kiszolgáló verziója: 10.4.11-MariaDB
-- PHP verzió: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `restapi`
--
CREATE DATABASE IF NOT EXISTS `restapi` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `restapi`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `email_verification`
--

CREATE TABLE `email_verification` (
  `id` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `user_id` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `expiration` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `forgot_password`
--

CREATE TABLE `forgot_password` (
  `id` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `user_id` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `expiration` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `raktar`
--

CREATE TABLE `raktar` (
  `id` int(11) NOT NULL,
  `nev` varchar(150) COLLATE utf8_hungarian_ci NOT NULL,
  `ar` int(11) NOT NULL,
  `keszleten` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `raktar`
--

INSERT INTO `raktar` (`id`, `nev`, `ar`, `keszleten`) VALUES
(100, 'Kanapé', 100000, 1),
(101, 'Étkezőasztal', 30000, 1),
(102, 'Ágy', 80000, 1),
(103, 'Polc', 10000, 1),
(104, 'Szekrény', 21000, 0),
(105, 'Dolgozóasztal', 20000, 1),
(106, 'Számítógép', 250000, 1),
(107, 'Laptop', 300000, 1),
(108, 'Szék', 7000, 0),
(109, 'Fiókos szekrény', 15000, 1),
(110, 'Fali állvány', 6500, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `username` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `email_verified` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `email_verified`) VALUES
('cd7539b84fe3448135c0', 'leventenyiro', 'nyiro.levente@gmail.com', '$2b$10$XJajxXSlSfhLSAQQ3ftrfuMDPXokSfqJl4abU3FoWC2LPQigfS/S6', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `email_verification`
--
ALTER TABLE `email_verification`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `forgot_password`
--
ALTER TABLE `forgot_password`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `raktar`
--
ALTER TABLE `raktar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nev_idx` (`nev`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uc_username` (`username`),
  ADD UNIQUE KEY `uc_email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `raktar`
--
ALTER TABLE `raktar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

DELIMITER $$
--
-- Események
--
CREATE DEFINER=`root`@`localhost` EVENT `delete_email_verification` ON SCHEDULE EVERY 20 SECOND STARTS '2020-07-23 19:49:03' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM email_verification WHERE expiration < NOW()$$

CREATE DEFINER=`root`@`localhost` EVENT `delete_forgot_password` ON SCHEDULE EVERY 20 SECOND STARTS '2020-07-27 22:57:04' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM forgot_password WHERE expiration < NOW()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
