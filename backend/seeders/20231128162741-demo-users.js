const { v4: uuidv4 } = require('uuid');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUsers = [];

    // Generate 30 demo users
    for (let i = 1; i <= 30; i++) {
      demoUsers.push({
        id: uuidv4(),
        name: `User${i}`,
        lastName: `Doe${i}`,
        age: Math.floor(Math.random() * 10) + 20, // Random age between 20 and 29
        height: Math.random() * (190 - 150) + 150, // Random height between 150 and 190
        weight: Math.random() * (100 - 50) + 50, // Random weight between 50 and 100
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Users', demoUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
