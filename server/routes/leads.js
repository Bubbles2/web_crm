
const router = require('express').Router();
const pool = require('../db');

// Create a lead
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, status, source } = req.body;
        const newLead = await pool.query(
            "INSERT INTO leads (name, email, phone, status, source) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [name, email, phone, status || 'New', source]
        );
        res.json(newLead.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all leads
router.get('/', async (req, res) => {
    try {
        const allLeads = await pool.query("SELECT * FROM leads");
        res.json(allLeads.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a specific lead
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await pool.query("SELECT * FROM leads WHERE lead_id = $1", [id]);
        res.json(lead.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a lead
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, status, source } = req.body;
        const updateLead = await pool.query(
            "UPDATE leads SET name = $1, email = $2, phone = $3, status = $4, source = $5 WHERE lead_id = $6",
            [name, email, phone, status, source, id]
        );
        res.json("Lead was updated!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a lead
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteLead = await pool.query("DELETE FROM leads WHERE lead_id = $1", [id]);
        res.json("Lead was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
