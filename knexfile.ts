import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./dev.sqlite"
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./db.sqlite"
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
