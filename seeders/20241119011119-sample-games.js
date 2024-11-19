'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('game', [
      {
        title: 'Minecraft',
        platform: 'Cross-platform',
        description: 'Minecraft is a sandbox game where players can build, explore, and survive.',
        cover_url: '/images/minecraft.jpg',  // Corrected the typo for cover image
        image_url: '/images/minecraft.jpg',  // Added image_url for Minecraft
        release_year: 2011,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'The Legend of Zelda: Breath of the Wild',
        platform: 'Nintendo Switch',
        description: 'Explore the vast world of Hyrule in this open-world adventure game.',
        cover_url: '/images/zelda.jpg',  // Updated cover_url as needed
        image_url: '/images/zelda.jpg',  // Added image_url for Zelda
        release_year: 2017,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('game', null, {});
  },
};

