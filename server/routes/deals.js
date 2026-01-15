const router = require('express').Router();
const pool = require('../db');

// Create a deal
router.post('/', async (req, res) => {
    try {
        const { title, amount, stage, contact_id, lead_id } = req.body;
        console.log("Creating deal:", req.body);
        const newDeal = await pool.query(
            "INSERT INTO deals (title, amount, stage, contact_id, lead_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [title, amount, stage || 'Proposal', contact_id, lead_id]
        );
        res.json(newDeal.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all deals
router.get('/', async (req, res) => {
    try {
        const allDeals = await pool.query("SELECT * FROM deals");
        res.json(allDeals.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a deal
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, stage, contact_id, lead_id } = req.body;
        const updateDeal = await pool.query(
            "UPDATE deals SET title = $1, amount = $2, stage = $3, contact_id = $4, lead_id = $5 WHERE deal_id = $6",
            [title, amount, stage, contact_id, lead_id, id]
        );
        res.json("Deal was updated!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a deal
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteDeal = await pool.query("DELETE FROM deals WHERE deal_id = $1", [id]);
        res.json("Deal was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
