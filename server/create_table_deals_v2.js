const pool = require('./db');

const createDealsTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS deals(
                deal_id SERIAL PRIMARY KEY,
                title VARCHAR(255),
                amount DECIMAL(10, 2),
                stage VARCHAR(50) DEFAULT 'Proposal',
                contact_id VARCHAR(255),
                lead_id VARCHAR(255)
            );
        `);
        console.log("Deals table created successfully");
    } catch (err) {
        console.error("Error creating deals table:", err.message);
    } finally {
        pool.end();
    }
};

createDealsTable();
