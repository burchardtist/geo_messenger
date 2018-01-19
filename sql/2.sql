CREATE TABLE tuser (
    id SERIAL,
    email varchar(255) NOT NULL UNIQUE,
    password_hash varchar(255) NOT NULL,
    PRIMARY KEY (ID)
);