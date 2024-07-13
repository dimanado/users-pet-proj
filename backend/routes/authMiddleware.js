module.exports.isAuth = (req, res, next) => {
    console.log('session', req.session.passport)
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}