const Pool = require('pg').Pool

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'interview',
  password: '1234',
  port: 5432,
})

module.exports = pool