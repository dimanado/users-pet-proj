const { User, UserCredential } = require('../models');
const {faker} = require('@faker-js/faker');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        order: [
          ['updatedAt', 'DESC'],
        ],
        include: UserCredential,
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createUser(req, res) {
    const { name, lastName, age, height, weight } = req.body;

    try {
      // const newUser = await User.create({
      //   name, lastName, age, height, weight,
      //   userCredentials: {
      //     email: 'daia@gmail.com',
      //     password: '1234567890',
      //     createdAt: new Date(),
      //     updatedAt: new Date()
      //   }
      // }, {
      //   include: [ UserCredentials ]
      // });
      // console.log(console.log(Object.getOwnPropertyNames(newUser)), 'test');
      // const test = newUser.createUserCredentials({
      //   email: 'daia@gmail.com',
      //   password: '1234567890',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // });
      // console.log(test, 'createUserCredentials');

      const userCredentials = UserCredentials.create({
        email: 'daia@gmail.com',
        password: '1234567890',
        UserId: 'd6ebeafc-0fb0-49e3-b0c4-b4672f94a4bb'
      }, { association: UserCredentials.User, })
      return res.status(201).json(userCredentials);
    } catch (error) {
      console.log(error, 'error');
      return res.status(400).json({ error: 'Bad Request' });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, lastName, age, height, weight } = req.body;

    try {
      const [rowsUpdated, [updatedUser]] = await User.update(
        { name, lastName, age, height, weight },
        { returning: true, where: { id: id } }
      );

      if (rowsUpdated === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const deletedRowCount = await User.destroy({ where: { id: id } });

      if (deletedRowCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new UserController();
