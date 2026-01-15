
const router = require('express').Router();
const pool = require('../db');

// Create a contact
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, role, company, linkedLeadId } = req.body;
        const newContact = await pool.query(
            "INSERT INTO contacts (name, email, phone, role, company, linked_lead_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [name, email, phone, role, company, linkedLeadId]
        );
        res.json(newContact.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const allContacts = await pool.query("SELECT * FROM contacts");
        res.json(allContacts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a contact
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, role, company, linkedLeadId } = req.body;
        const updateContact = await pool.query(
            "UPDATE contacts SET name = $1, email = $2, phone = $3, role = $4, company = $5, linked_lead_id = $6 WHERE contact_id = $7",
            [name, email, phone, role, company, linkedLeadId, id]
        );
        res.json("Contact was updated!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteContact = await pool.query("DELETE FROM contacts WHERE contact_id = $1", [id]);
        res.json("Contact was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
