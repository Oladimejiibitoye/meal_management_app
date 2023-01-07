import 'dotenv/config'
import Knex from 'knex';

const connection = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

async function createDatabase() {
  let knex = Knex({
    client: 'pg',
    connection
  })

  //lets create our database if it does not exist
  await knex.raw(`CREATE DATABASE ${process.env.DATABASE_NAME}`)

  // knex = Knex({
  //   client: 'pg',
  //   connection: {
  //     ...connection,
  //     database: process.env.DATABASE_NAME
  //   }
  // })
}

createDatabase().then(result => process.exit()).catch(error => console.log(error))
