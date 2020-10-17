const config = require('./config');

module.exports = {

    development: {
        client: config.db.dev.client,
        connection: async function () {
            return {
                host: config.db.dev.host,
                database: config.db.dev.name,
                user: config.db.dev.user,
                password: config.db.dev.password
            };
        },
        pool: {
            min: Number(config.db.dev.min_pool) || 0,
            max: Number(config.db.dev.max_pool) || 1
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: __dirname + '/db/migrations'
        }
    },

    test: {
        client: config.db.test.client,
        connection: async function () {
            return {
                host: config.db.test.host,
                database: config.db.test.name,
                user: config.db.test.user,
                password: config.db.test.password
            };
        },
        pool: {
            min: Number(config.db.test.min_pool) || 0,
            max: Number(config.db.test.max_pool) || 1
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: __dirname + '/db/migrations'
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: __dirname + '/db/migrations'
        }
    }

};
