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
  }
  ,
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
    ssl:true,
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
}
//[process.env.NODE_ENV || "development"];
