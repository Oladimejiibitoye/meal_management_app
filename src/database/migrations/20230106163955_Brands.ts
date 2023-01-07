import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .createTable('brands', function(table){
    table.uuid('id', {primaryKey: true});
    table.string('brand_name', 255).notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(false, true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('brands');
}

