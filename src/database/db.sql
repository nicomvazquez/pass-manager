CREATE DATABASE passmanager;
\c passmanager; -- Cambiar a la base de datos recién creada

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    id_user INT,
    title VARCHAR(255),
    password VARCHAR(255),
    url VARCHAR(255)
);