// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user:     process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
