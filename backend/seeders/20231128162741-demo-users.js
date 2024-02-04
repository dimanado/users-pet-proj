'use strict';

const { faker } = require('@faker-js/faker');

const { User, UserCredential } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i= 1 ; i <= 100 ; i++) {
      const name = faker.person.firstName();
      const lastName = faker.person.lastName();
      const user = {
        name,
        lastName,
        age: faker.number.int({min: 18, max: 65}),
        height: faker.number.float({min: 1.5, max: 2.0, precision: 0.01}),
        weight: faker.number.float({min: 50, max: 100, precision: 0.01}),
        createdAt: new Date(),
        updatedAt: new Date(),
        UserCredential: {
          email: faker.internet.email({firstName: name, lastName: lastName}),
          password: '1234567890',
        }
      };
      await User.create(user, {
        include: UserCredential
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('UserCredentials', null, {});
  }
};
