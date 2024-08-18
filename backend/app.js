const createError = require('http-errors');
const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/user');
const { sequelize } = require('./models');
const { isAuth } = require('./routes/authMiddleware');

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200',
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: new SequelizeStore({
            db: sequelize,
        }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        }
    })
);

require('./config/password');

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use('/users', isAuth, usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
