CREATE TABLE bars
(
    id   integer not null
        constraint bars_pk
            primary key autoincrement,
    name text    not null,
    lat  REAL    not null,
    long real    not null
);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE beverages
(
    id               integer not null
        constraint beverages_pk
            primary key autoincrement,
    name             text    not null,
    proof_percentage integer not null,
    volume_in_ml     integer not null
);
CREATE TABLE IF NOT EXISTS "users"
(
    id       integer not null
        constraint users_pk
            primary key,
    name     text    not null,
    password text    not null,
    email    text    not null
        constraint users_pk_2
            unique
);
CREATE TABLE config
(
    id    integer
        constraint config_pk
            primary key autoincrement,
    name  text
        constraint config_pk_2
            unique,
    value text not null
);
CREATE TABLE sessions
(
    id       integer not null
        constraint sessions_pk
            primary key autoincrement,
    name     text    not null,
    start_ts integer not null,
    end_ts   integer
);
CREATE TABLE IF NOT EXISTS "session_drinks"
(
    session_id  integer not null,
    beverage_id integer not null,
    time        integer not null,
    bar_id      integer not null,
    id          integer not null
        constraint session_drinks_pk
            primary key autoincrement
);
