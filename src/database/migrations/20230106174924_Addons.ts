import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .createTable('addons', function(table){
    table.uuid('id', {primaryKey: true});
    table.string('name', 255).notNullable();
    table.string('description', 1000).nullable();
    table.decimal('price').notNullable();
    table.string('category', 255).nullable();
    table.uuid('brand_id').references('id').inTable('brands').onDelete('CASCADE');
    table.uuid('addons_category_id').references('id').inTable('addons_categories').onDelete('CASCADE');
    table.timestamps(false, true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('addons');
}

