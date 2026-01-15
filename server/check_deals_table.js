const pool = require('./db');

const checkTable = async () => {
    try {
        console.log("Checking if deals table exists...");
        const res = await pool.query('SELECT * FROM deals LIMIT 1');
        console.log("Query successful. Table exists.");
        console.log("Rows:", res.rows);
    } catch (err) {
        console.error("Query failed:", err.message);
    } finally {
        pool.end();
    }
};

checkTable();
