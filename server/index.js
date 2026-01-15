
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
app.use('/leads', leadsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
