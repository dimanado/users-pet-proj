const { User } = require('../models');

class LoginController {
    async login(req, res) {
        const { id, name, lastName } = await User.findByPk(req.user.UserId);
        res.json({ id, name, lastName });
    }

    logout(req, res) {
        req.logout(() => res.json({ message: 'Logged out' }));
    }
}

module.exports = new LoginController();