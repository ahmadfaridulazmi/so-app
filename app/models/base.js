const { Model } = require('objection');
const config = require('../../config');
const knexInstanceFile = require('../../knexfile');
const knex = require('knex');
Model.knex(knex(knexInstanceFile[config.NODE_ENV]));

module.exports = Model;
