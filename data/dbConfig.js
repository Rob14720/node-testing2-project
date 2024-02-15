const knex = require('knex');
const configs = require('../knexfile.js');
const env = 'development';

module.exports = knex(configs[env]);
