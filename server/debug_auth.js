
const { Client } = require('pg');
require('dotenv').config();

const password = process.env.DB_PASSWORD || '';
console.log('--- Password Debug ---');
console.log('Length:', password.length);
console.log('Char codes:', password.split('').map(c => c.charCodeAt(0)).join(', '));
console.log('----------------------');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
};

async function testConnection(label, extraConfig = {}) {
    const client = new Client({ ...config, ...extraConfig });
    try {
        console.log(`Testing connection (${label})...`);
        await client.connect();
        console.log(`[${label}] Success!`);
        await client.end();
        return true;
    } catch (err) {
        console.log(`[${label}] Failed: ${err.message}`);
        return false;
    }
}

(async () => {
    // Test 1: Standard
    await testConnection('Standard');

    // Test 2: TCP (force IPv4 if localhost resolves to IPv6)
    // Sometimes localhost resolves to ::1 and pg_hba.conf is different for IPv6
    const configIP = { ...config, host: '127.0.0.1' };
    const clientIP = new Client(configIP);
    try {
        console.log(`Testing connection (127.0.0.1)...`);
        await clientIP.connect();
        console.log(`[127.0.0.1] Success!`);
        await clientIP.end();
    } catch (err) {
        console.log(`[127.0.0.1] Failed: ${err.message}`);
    }
})();
