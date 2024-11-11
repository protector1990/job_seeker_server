const { Pool } = require('pg');
const itemsPool = new Pool({
    connectionString: 'postgres://postgres:postgres@localhost/job_hunter'
});
module.exports = itemsPool;