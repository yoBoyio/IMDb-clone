
--
-- Database: `moviesProject`
--


-- --------------------------------------------------------
--
-- Table structure for table `users`
--

CREATE TABLE `users` (
    `userId` INT NOT NULL unique auto_increment,
    `userName` VARCHAR(255) NOT NULL,
    `userEmail` VARCHAR(255) NOT NULL,
    `userPassword` VARCHAR(255) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (userEmail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Indexes for table `board`
--

INSERT INTO `users` (`userEmail`, `userName` , `userPassword`, `isAdmin` ) VALUES
('admin', 'admin' , 'pass', true);


-- --------------------------------------------------------
--
-- Table structure for table `Watchlist`
--


CREATE TABLE `watchlist` (
    `userEmail` VARCHAR(255) NOT NULL,
    `movieId` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------
--
-- Table structure for table `Ratings`
--


CREATE TABLE `ratings` (
    `ratingId` INT NOT NULL unique auto_increment,
    `movieId` INT NOT NULL,
    `userEmail` VARCHAR(255) NOT NULL,
    `commentContent` VARCHAR(255) DEFAULT NULL,
    `rating` INT NOT NULL,
    PRIMARY KEY (ratingId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;