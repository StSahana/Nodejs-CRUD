var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var connect = require('connect');
var sessionStore = require('session-mongoose')(connect);
var mongodb = require("./app/mongodb");

var routes = require('./routes/index');
var users = require('./routes/users');
var departments = require('./routes/departments');
var contacts = require('./routes/contacts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);

app.use(session({
    secret: "compApp",
    key: "compApp",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: true
    },//有效期1天
    resave: false,
    saveUninitialized: true,
    store: new sessionStore({
        connection: mongodb.mongoose.connection,
        // url:"mongodb://localhost:8181/compApp",
        collection: "sessions",
        interval: 3600000
    })
}));

app.use('/', routes);
app.use('/users', users);
app.use('/departments', departments);
app.use('/contacts', contacts);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
