CREATE DATABASE passmanager;
USE passmanager;

CREATE TABLE user(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)  
);

CREATE TABLE post(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_user INT(11),
    title VARCHAR(255),
    password VARCHAR(255),
    url VARCHAR(255)
);