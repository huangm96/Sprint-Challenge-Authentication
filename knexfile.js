// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
     connection: {
      filename: "./database/users.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    }
  },
  staging: {
    client: "pg",
    connection: {
      host:'127.0.0.1',
      database: "user_test1",
      
    },
    pool: {
      min: 2,
      max: 10
    },
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
    connection: process.env.DATABASE_URL,
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
