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
                console.log('test1');
                return cb(null, false);
            }
            console.log('test2');
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