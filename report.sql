-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2021 at 08:50 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `report`
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
(2, 'Akhtar', 'akhtar@gmail.com', 'abraar'),
(4, 'Admin', 'admin@gmail.com', 'admin'),
(5, 'Admin', 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id_report` int(25) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `response` text DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_user` int(25) NOT NULL,
  `status` varchar(225) NOT NULL,
  `id_admin` int(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id_report`, `title`, `content`, `response`, `date_created`, `id_user`, `status`, `id_admin`) VALUES
(7, 'report', 'laporlapor', 'nice try kid', '2021-03-25 19:44:28', 4, 'Approved', 4),
(8, 'Complaint Title', 'Should Should Should Should', NULL, '2021-03-26 04:14:11', 4, 'Pending', NULL),
(9, 'Jalan Rusak', 'di Jl. Semalang karaya meter ke 12 ada jalan rusak dengan diameter lobang sebesar 80 m3', NULL, '2021-03-26 04:32:20', 4, 'Pending', NULL),
(10, 'Jalan Rusak', 'Terdapat bolongan di Jl. Semalang Karaya meter ke 25 dengan diameter lobang sebesar 80 m3', NULL, '2021-03-26 04:33:21', 4, 'Pending', NULL),
(11, 'Berhasil', 'lapor berhasil', 'Mantap', '2021-03-26 06:52:53', 6, 'Approved', 4);

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
(3, 'cobahash@gmail.com', 'cobaHash', '$2a$10$kKluXcZuxvgi.rmKWp6lNeQNEIy8JKuYZLbErMpLqEjASHkFnw4R2', '123123123'),
(4, 'abraar23@gmail.com', 'Akhtar Muz', '$2a$10$4EVe8hqXsbWAZDPAGXzcquVsllojCg4uc0mjeS0r4/7Dubmonak6K', '19820598'),
(5, 'bidin@gmail.com', 'Pak Abidin', '$2a$10$w4pUcZkS/SxpzmmJbV9YZeQCygr6PPgmqL6W6NlXuJ/AX.9asLSr.', '09808989'),
(6, 'zainul@gmail.com', 'Pak Zainul', '$2a$10$mzZ9yqehRxkq9pMNgyI/VO0twmn5xCiH7kYw/uNsLdKQFyQ52I76a', '0888888');

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
  MODIFY `id_admin` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id_report` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
