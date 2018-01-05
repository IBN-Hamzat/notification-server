//require('dotenv-safe').load({allowEmptyValues: true});

const cfg = {};

// HTTP Port to run our web application
cfg.port = 4000//process.env.PORT || 4000;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = 'abc'//process.env.APP_SECRET || 'keyboard cat';
//cfg.jwtsecret= "abc",

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
//
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.accountSid ='ACad4a71fafbd03d764ee6fbc796f88f42'; //process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = '0c6ec9d014915c876b7e185cc4e49c42';//process.env.TWILIO_AUTH_TOKEN;

// A Twilio number you control - choose one from:
// https://www.twilio.com/user/account/phone-numbers/incoming
// Specify in E.164 format, e.g. "+16519998877"
cfg.twilioNumber = "+16302803323"//process.env.TWILIO_NUMBER;

// MongoDB connection string - MONGO_URL is for local dev,
// MONGOLAB_URI is for the MongoLab add-on for Heroku deployment
cfg.mongoUrl = "mongodb://localhost:27017/exodusApp";//process.env.MONGOLAB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017'; // default

// MongoDB connection string for test purposes
cfg.mongoUrlTest = 'mongodb://localhost:8000';
cfg.NEXMO_API_KEY='ef3c7f2f';
cfg.NEXMO_API_SECRET='efcd22f522164b55';
cfg.from='Exodus';
// Export configuration object
cfg.mailservice='';
cfg.mailUsername='';
cfg.mailPassword='';
module.exports = cfg;
