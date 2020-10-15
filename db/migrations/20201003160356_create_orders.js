
exports.up = function(knex) {
  return knex.schema.createTable('orders', function (table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('users.id').index();
    table.string('title').notNullable();
    table.text('descriptions')
    table.string('status');
    table.timestamp('created_at');
    table.timestamp('payment_at');
    table.timestamp('deleted_at');
    table.timestamp('updated_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
