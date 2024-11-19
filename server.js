require('dotenv').config(); // Ensure this is at the top of the file
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');  
const { Game } = require('./models');  // Import the Game model
const { Sequelize } = require('sequelize'); // Import Sequelize
const dialect = process.env.DB_DIALECT || 'postgres';  // Fallback to 'postgres' if not set

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Handlebars as view engine
app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');

// Serve images from the "public/images" directory
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Sequelize connection using environment variables
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

// Test the connection to ensure it's working
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Root route - Fetch all games and render on the homepage
app.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.render('game', { title: 'GamerBud', games });
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send('Error fetching games.');
    }
});

// Route for a single game's details page
app.get('/game/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (game) {
            res.render('gameDetail', { title: game.title, game });
        } else {
            res.status(404).send('Game not found.');
        }
    } catch (error) {
        console.error('Error fetching game details:', error);
        res.status(500).send('Error fetching game details.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
