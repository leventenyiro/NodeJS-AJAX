-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2021. Jan 19. 13:55
-- Kiszolgáló verziója: 10.4.17-MariaDB
-- PHP verzió: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

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
-- Tábla szerkezet ehhez a táblához `favorite`
--

CREATE TABLE `favorite` (
  `id` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `product_id` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `user_id` varchar(200) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `favorite`
--

INSERT INTO `favorite` (`id`, `product_id`, `user_id`) VALUES
('1', '079cc1bfdc1682531822', '9053b0d0e4d990d7eccc');

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
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `id` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `name` varchar(150) COLLATE utf8_hungarian_ci NOT NULL,
  `price` int(11) NOT NULL,
  `availability` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `availability`) VALUES
('079cc1bfdc1682531822', 'Dolgozóasztal', 20000, 0),
('2c47c34bc01deb63be5d', 'Étkezőasztal', 30000, 0),
('2e20fb234a104066983c', 'Ágy', 80000, 1),
('64a419cb63a72e97e112', 'Számítógép', 250000, 1),
('928c3cd0bf2f3fca361e', 'Szék', 7000, 1),
('97ea5799309afd7d6e11', 'Polc', 10000, 0),
('a9e18a7ab8a62012509e', 'Fiókos szekrény', 15000, 1),
('c758ed08eeb16b3d28c3', 'Szekrény', 21000, 1),
('d10f987a5fd6941c7f6c', 'Fali állvány', 6500, 0),
('de214d4b3355a9b9372d', 'Laptop', 300000, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `username` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `email_verified` tinyint(4) NOT NULL,
  `image` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `email_verified`, `image`) VALUES
('9053b0d0e4d990d7eccc', 'leventenyiro', 'nyiro.levente@gmail.com', '$2b$10$HRvnr51EVgNHrgYckFPtGe8Et4mJKFzdOyX9DaTC0afYIRJJa4uSa', 1, '');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `email_verification`
--
ALTER TABLE `email_verification`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `forgot_password`
--
ALTER TABLE `forgot_password`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nev_idx` (`name`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uc_username` (`username`),
  ADD UNIQUE KEY `uc_email` (`email`);

DELIMITER $$
--
-- Események
--
CREATE DEFINER=`root`@`localhost` EVENT `delete_email_verification` ON SCHEDULE EVERY 20 SECOND STARTS '2020-07-23 19:49:03' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM email_verification WHERE expiration < NOW()$$

CREATE DEFINER=`root`@`localhost` EVENT `delete_forgot_password` ON SCHEDULE EVERY 20 SECOND STARTS '2020-07-27 22:57:04' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM forgot_password WHERE expiration < NOW()$$

DELIMITER ;
COMMIT;