CREATE TABLE messages (
    id SERIAL,
    created timestamp NOT NULL,
    life_time int NOT NULL DEFAULT 5,
    title varchar(255) NOT NULL,
    text varchar(255) NOT NULL,
    lat float NOT NULL,
    lon float NOT NULL,
    range integer NOT NULL DEFAULT 5,
    PRIMARY KEY (ID)
);