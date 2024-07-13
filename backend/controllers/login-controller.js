class LoginController {
    async login(req, res) {
        req.session.views = 1;
        console.log('session', req.session);
        res.json({ message: 'User login successfully' });
    }
}

module.exports = new LoginController();