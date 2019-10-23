// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/users.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/test.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    }
  },
  production: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "Huang86481673",
      database: "user_test"
    },
     migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
