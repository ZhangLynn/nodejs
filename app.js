var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
// connect session and redis to create a redis store
const RedisStore = require('connect-redis')(session);
var indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const redisClient = require('./src/db/redis')
const sessionStore = new RedisStore({
    client: redisClient
})
// use session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: '0701_tao', // the spell must be correct, otherwise we can not get the session
    cookie: {
        // path: '/', // default config
        // httpOnly: true, // default config,
        maxAge: 24 * 60 * 60 * 10000
    },
    store: sessionStore
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

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
