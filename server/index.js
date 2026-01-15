
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const leadsRouter = require('./routes/leads');
const contactsRouter = require('./routes/contacts');
app.use('/leads', leadsRouter);

const dealsRouter = require('./routes/deals');
app.use('/deals', dealsRouter);
app.use('/contacts', contactsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
