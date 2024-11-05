const express = require('express');
const router = express.Router();
const Profile = require('../models/profiles');

// Get all profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Create a new profile
router.post('/', async (req, res) => {
    const { gamerTag, platform, games } = req.body;
    const profile = new Profile({ gamerTag, platform, games });

    try {
        const savedProfile = await profile.save();
        res.status(201).json(savedProfile);
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(400).json({ message: error.message });
    }
});

// Delete a profile
router.delete('/:id', async (req, res) => {
    try {
        const removedProfile = await Profile.findByIdAndDelete(req.params.id);
        if (!removedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(removedProfile);
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Update a profile
router.put('/:id', async (req, res) => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
