const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const router = express.Router();

// PostgreSQL configuration
const pool = new Pool({
    user: 'postgres',       // e.g., 'postgres'
    host: 'localhost',                     // or the IP address of your database server
    database: 'Gamerbud',                  // your database name
    password: 'Lovebsdraco18101',    // your password
    port: 5432,                            // default PostgreSQL port
});

// User Registration
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id',
            [username, hashedPassword, email]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        res.status(400).json({ error: 'User already exists' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret'); // Change this to a secure secret
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Export the router
module.exports = router;
