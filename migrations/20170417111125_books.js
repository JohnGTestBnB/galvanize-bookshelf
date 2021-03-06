
exports.up = function(knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments();
    table.string('title', 255).notNullable().defaultTo('');
    table.string('author', 255).notNullable().defaultTo('');
    table.string('genre', 255).notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.text('cover_url').notNullable().defaultTo('');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('books');
};
