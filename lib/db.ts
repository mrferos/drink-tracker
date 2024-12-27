const db = require('knex')({
    client: 'sqlite3', // or 'better-sqlite3'
    useNullAsDefault: true,
    connection: {
        filename: process.env.SQLITE_PATH || '../db.sqlite',
    },
});

export default db;