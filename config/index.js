require('dotenv').config({ path: './.env' });
const ENV_VARS = process.env;

let config = {
  db: {
    dev: {
      client: ENV_VARS.DEV_DB_CLIENT,
      host: ENV_VARS.DEV_DB_HOST,
      name: ENV_VARS.DEV_DB_NAME,
      user: ENV_VARS.DEV_DB_USER,
      password: ENV_VARS.DEV_DB_PASSWORD,
      min_pool: ENV_VARS.DEV_DB_MIN_POOL || 0,
      max_pool: ENV_VARS.DEV_DP_MAX_POOL || 2
    },
    test: {
      client: ENV_VARS.TEST_DB_CLIENT,
      host: ENV_VARS.TEST_DB_HOST,
      name: ENV_VARS.TEST_DB_NAME,
      user: ENV_VARS.TEST_DB_USER,
      password: ENV_VARS.TEST_DB_PASSWORD,
      min_pool: ENV_VARS.TEST_DB_MIN_POOL || 0,
      max_pool: ENV_VARS.TEST_DP_MAX_POOL || 2
    },
    production: {
      min_pool: ENV_VARS.PRODUCTION_DB_MIN_POOL || 0,
      max_pool: ENV_VARS.PRODUCTION_DB_MAX_POOL || 2
    },
  },
  NODE_ENV: ENV_VARS.NODE_ENV || 'development',
  DEFAULT_ITEMS_PER_PAGE: 15,
  MAX_ITEMS_PER_PAGE: 50,
  VERSION: '1.0.0'
};

module.exports = config;

