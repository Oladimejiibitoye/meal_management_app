import { Knex } from "knex";
import 'dotenv/config'

export async function up(knex: Knex): Promise<void> {

  return knex.schema
    .createTable('users', function(table){
      table.uuid('id', {primaryKey: true});
      table.string('name', 255).notNullable();
      table.boolean('is_admin').defaultTo(false)
      table.timestamps(false, true)
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

