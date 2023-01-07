import 'dotenv/config'
import { knexSnakeCaseMappers } from 'objection';


module.exports = {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user:     process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    },
    migrations: {
      directory: './src/database/migrations'
    },

    ...knexSnakeCaseMappers()

};
