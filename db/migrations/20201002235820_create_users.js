
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('username').notNullable().index();
        table.string('email').notNullable().index().unique();
        table.string('password').notNullable();
        table.jsonb('payment_credentials');
        table.timestamp('created_at');
        table.timestamp('deleted_at');
        table.timestamp('updated_at');
        //test
        //test
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
