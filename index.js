require('rootpath')();
const config = require('./config');

var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
//var config = require('config.json');
var morgan  = require('morgan');
var mongoose  = require('mongoose');

//mongoose.connect(config.connection); // connect to database
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
// Initialize database connection - throws if database connection can't be
// established
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
}).unless({ path: ['/api/authenticate','/','/message/send','/api/clients', '/api/sms','/api/mail'] }));
// routes
app.use('/api', require('./controllers/user'));
app.use('/api', require('./controllers/client.controller'));
app.use('/api', require('./controllers/message.controller'));
app.use('/api', require('./controllers/smsmessage.controller'));
//app.use('/api', require('./controllers/payment.controller'));
// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
