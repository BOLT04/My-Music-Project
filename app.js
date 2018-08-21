var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var multer = require('multer'); // Handles files from forms
var flash = require('connect-flash');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var db = mongoose.connection;

// Template engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Handle Sessions.
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Authentication system
app.use(passport.initialize()); // why doesn't passport.Passport.initialize() work since intelissense is saying the way it currently is shows 'unresolved'????!!
app.use(passport.session());

app.use(flash());

// Handle file uploads.
//app.use(multer({dest: './uploads'})); ??????????????????????



// Validator???????????????????
app.use(expressValidator());
    /*errorFormatter: (param, msg, value) => {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while (namespace.length)
            formParam += '[' + namespace.shift() + ']';

        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
*/

// Configure routing.
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res) => {
    res.locals.messages = require('express-messages');
    //next();
});


module.exports = app;
