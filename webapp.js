const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const config = require('./config');
var expressJwt = require('express-jwt');
var cors = require('cors');

// Create Express web app
const app = express();
//app.set('view engine', 'jade');

// Use morgan for HTTP request logging
app.use(morgan('combined'));

// Serve static assets
//app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming form-encoded HTTP bodies
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(cors());
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/api/authenticate','/','/message/send','/api/clients'] }));

// Create and manage HTTP sessions for all requests
// app.use(session({
//     secret: config.secret,
//     resave: true,
//     saveUninitialized: true,
// }));

// Use connect-flash to persist informational messages across redirects
app.use(flash());

// Configure application routes
require('./controllers/router')(app);
app.use('/api', require('./controllers/user'));
app.use('/api', require('./controllers/client.controller'));
// Handle 404
app.use(function(request, response, next) {
    response.status(404);
    response.sendFile(path.join(__dirname, 'public', '404.html'));
});

// Unhandled errors (500)
app.use(function(err, request, response, next) {
    console.error('An application error has occurred:');
    console.error(err);
    console.error(err.stack);
    response.status(500);
    response.sendFile(path.join(__dirname, 'public', '500.html'));
});

// Export Express app
module.exports = app;
