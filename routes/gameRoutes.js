const express = require('express');
const { Game } = require('../models');

const router = express.Router();

// Route for home page displaying all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.render('game', { title: 'GamerBud', games });
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send('Error fetching games.');
    }
});

// Route for single game details
router.get('/game/:id', async (req, res) => {
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

module.exports = router;
