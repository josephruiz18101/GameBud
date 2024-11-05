const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gamerTag: { type: String, required: true },
    platform: { type: String, required: true },
    games: { type: [String], required: true },
});

module.exports = mongoose.model('Profile', profileSchema);
