'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('games', [
      
        {
          title: 'Animal Crossing: New Horizons',
          description: 'A life-simulation game where players build and manage their own island paradise, interacting with anthropomorphic animal villagers and customizing their environment.',
          image_url: '/images/1.jpg',
          platform: 'Nintendo Switch',
          release_year: 2020,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Apex Legends',
          description: 'A free-to-play battle royale game where players choose from a roster of unique Legends, each with their own abilities, and compete in a team-based combat to be the last squad standing.',
          image_url: '/images/2.jpg',
          platform: 'PlayStation 4, Xbox One, PC, Nintendo Switch',
          release_year: 2019,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Assassin\'s Creed Odyssey',
          description: 'An action RPG set in Ancient Greece, where players take on the role of a mercenary, exploring vast open-world environments, engaging in battles, and influencing the story through decisions.',
          image_url: '/images/3.jpg',
          platform: 'PlayStation 4, Xbox One, PC, Stadia',
          release_year: 2018,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Assassin\'s Creed Valhalla',
          description: 'An open-world action RPG where players take on the role of Eivor, a Viking raider exploring and conquering territories in England during the Viking Age.',
          image_url: '/images/4.jpg',
          platform: 'PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, PC, Stadia',
          release_year: 2020,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Astral Chain',
          description: 'An action-adventure game where players control two characters simultaneously, a cop and their sentient weapon, to fight off interdimensional creatures and uncover a complex conspiracy.',
          image_url: '/images/5.jpg',
          platform: 'Nintendo Switch',
          release_year: 2019,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Astro\'s Playroom',
          description: 'A platformer game designed to showcase the PlayStation 5’s new DualSense controller, featuring Astro Bot as the main character on a journey through various themed worlds.',
          image_url: '/images/6.jpg',
          platform: 'PlayStation 5',
          release_year: 2020,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Battlefield V',
          description: 'A first-person shooter set during World War II, featuring large-scale battles, destructible environments, and dynamic weather systems.',
          image_url: '/images/7.jpg',
          platform: 'PlayStation 4, Xbox One, PC',
          release_year: 2018,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Bayonetta 2',
          description: 'An action hack-and-slash game starring Bayonetta, a witch who battles angels and demons in fast-paced combat, known for its stylish gameplay and over-the-top action.',
          image_url: '/images/8.jpg',
          platform: 'Nintendo Switch, Wii U',
          release_year: 2014,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Bayonetta 3',
          description: 'The latest entry in the Bayonetta series, continuing the story of the powerful witch, featuring intense combat and new powers, along with a more expansive story.',
          image_url: '/images/9.jpg',
          platform: 'Nintendo Switch',
          release_year: 2022,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Bioshock Infinite',
          description: 'A first-person shooter set in the floating city of Columbia, where players take the role of Booker DeWitt, tasked with rescuing a mysterious girl named Elizabeth while unraveling a complex story.',
          image_url: '/images/10.jpg',
          platform: 'PlayStation 3, Xbox 360, PC, Nintendo Switch',
          release_year: 2013,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
      ,
     {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('games', null, {});
  },
};

