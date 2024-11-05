const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Configuration
const pool = new Pool({
    user: process.env.POSTGRES_USER, // your PostgreSQL username from .env
    host: 'localhost', // your PostgreSQL host
    database: process.env.DATABASE, // your database name from .env
    password: process.env.POSTGRES_PASSWORD, // your PostgreSQL password from .env
    port: 5432, // PostgreSQL port (default is 5432)
});

// Test Database Connection
pool.connect()
    .then(client => {
        console.log('Connected to PostgreSQL database');
        client.release(); // Release the client back to the pool
    })
    .catch(err => console.error('Database connection error', err));

// Debugging Middleware
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    next();
});

// User Routes
const userRoutes = express.Router();

// User Registration
userRoutes.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id',
            [username, hashedPassword, email]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({ error: 'User already exists' });
    }
});

// User Login
userRoutes.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, 'your_jwt_secret'); // Change this to a secure secret
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Use User Routes
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Gaming Buddy API');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
