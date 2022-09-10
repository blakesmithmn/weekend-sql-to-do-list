// Import pg node module:
const pg = require('pg');

// Persistent connection to a database:
const Pool = pg.Pool;

const host = "localhost";
const database = "weekend-to-do-app";

// how DB connection is created/configured
const pool = new Pool ({
    database: database,
    host: host
})

pool.on('connect', ()=> {
    console.log(`Successfully connected to ${host} ${database}`);
})

pool.on('error', ()=> {
    console.log(`Failed to connect to ${host} ${database}`, error);
})

// Export DB connection:
module.exports = pool;