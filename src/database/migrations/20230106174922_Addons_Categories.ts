import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .createTable('addons_categories', function(table){
    table.uuid('id', {primaryKey: true});
    table.string('name', 255).notNullable();
    table.uuid('brand_id').references('id').inTable('brands').onDelete('CASCADE');
    table.timestamps(false, true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('addons_categories');
}

