const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"123",
    host:"192.168.0.100",
    port:5432,
    database: "jwttoken"
});

module.exports = pool
