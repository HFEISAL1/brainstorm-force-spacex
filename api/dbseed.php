<?php

require 'bootstrapper.php';

$statement = <<<EOS
    CREATE TABLE `users` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
        `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
        `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
        `password` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `email` (`email`)
    ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
EOS;

try {
    $createTable = $dbConnection->exec($statement);
    echo "Success!\n";
} catch (\PDOException $e) {
    exit($e->getMessage());
}
