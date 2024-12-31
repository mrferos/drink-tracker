const environment = process.env.NODE_ENV || 'development'; // Defaults to development
const config = require('../knexfile')[environment];
const db = require('knex')(config);

export default db;