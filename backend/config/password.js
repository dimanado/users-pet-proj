const passport = require('passport');
const LocalStrategy = require('passport-local');

const { UserCredential } = require('../models');

customFields = {
    usernameField: 'email',
    passwordField: 'password',
};
const strategy = new LocalStrategy(customFields, (username, password, cb) => {
    UserCredential.findOne({ where: { email: username } })
        .then((userCredential) => {
            if (!userCredential || !userCredential.validatePassword(password)) {
                return cb(null, false);
            }
            return cb(null, userCredential);
        })
        .catch(cb);
});

passport.use(strategy);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((userId, cb) => {
    UserCredential.findByPk(userId)
        .then((userCredential) => {
            cb(null, userCredential);
        })
        .catch(error => cb(error));
});