-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2021 at 06:24 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ukk`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(25) NOT NULL,
  `username` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `email`, `password`) VALUES
(6, 'hilmi', 'hilmi@admin.com', 'hilmi');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id_report` int(25) NOT NULL,
  `content` text NOT NULL,
  `respon` text DEFAULT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp(),
  `id_user` int(25) NOT NULL,
  `status` varchar(225) NOT NULL,
  `id_admin` int(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id_report`, `content`, `respon`, `date_created`, `id_user`, `status`, `id_admin`) VALUES
(1, '\'I Don\'t Have\'', '', '2021-03-23', 1, 'Approved', NULL),
(2, 'I Don\'t Have', '', '2021-03-23', 1, 'Rejected', NULL),
(4, 'server error', '', '2021-03-24', 5, 'Pending', NULL),
(5, 'punten', '', '2021-03-24', 5, 'Pending', NULL),
(6, 'hahaha', '', '2021-03-24', 5, 'Pending', NULL),
(7, 'an', '', '2021-03-24', 5, 'Pending', NULL),
(8, 'firman', '', '2021-03-24', 5, 'Pending', NULL),
(9, 'firman', '', '2021-03-24', 5, 'Pending', NULL),
(10, 'firman', '', '2021-03-24', 5, 'Pending', NULL),
(11, 'firman', '', '2021-03-24', 5, 'Pending', NULL),
(12, 'firman', '', '2021-03-24', 5, 'Pending', NULL),
(13, 'firman', '', '2021-03-24', 5, 'Pending', NULL),
(14, 'tsm', '', '2021-03-24', 5, 'Pending', NULL),
(15, 'beaulo', '', '2021-03-24', 5, 'Rejected', NULL),
(16, 'PUNTEN', NULL, '2021-03-24', 5, 'Approved', NULL),
(17, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, '2021-03-25', 5, 'Pending', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(20) NOT NULL,
  `email` varchar(225) NOT NULL,
  `username` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `telp` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `email`, `username`, `password`, `telp`) VALUES
(1, 'firmandarkzz6809@gmail.com', '1stuser', 'rre', '123'),
(2, 'user@user.com', '2nduser', '12345', '101'),
(3, 'user3@user.com', '3rduser', '12345', '1011'),
(4, 'user4@user.com', '4thuser', '12345', '1011'),
(5, 'arkan@gmail.com', 'arkan', 'arkan', '123'),
(6, 'sd@gmail.com', 'asd', '', ''),
(7, 'asd@gmail.com', 'asd', 'asd', '231'),
(8, 'arkan@gmail.com', 'arkan', 'arkan', '123'),
(9, 'maulana@gmail.com', 'maulana', 'maulana', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id_report`),
  ADD KEY `id_admin` (`id_admin`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id_report` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`),
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
