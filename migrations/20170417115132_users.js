
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name', 255).notNullable().defaultTo('');
    table.string('last_name', 255).notNullable().defaultTo('');
    table.string('email', 255).unique().notNullable();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
