CREATE TABLE messages (
    id SERIAL,
    created timestamp NOT NULL,
    life_time int,
    title varchar(255) NOT NULL,
    text varchar(255) NOT NULL,
    lat float,
    lon float,
    range integer,
    PRIMARY KEY (ID)
);