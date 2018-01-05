require('rootpath')();
var nodemailer = require('nodemailer');
const Nexmo = require('nexmo')
var config = require('config');

var _ = require('lodash');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/exodusApp", { native_parser: true });
db.bind('smsmessages');

var service = {};

service.sendSms = sendSms;
service.getAllSms = getAllSms;
service.getSms = getSms;

module.exports = service;

const nexmo = new Nexmo({
  apiKey: config.NEXMO_API_KEY,
  apiSecret: config.NEXMO_API_SECRET
})

var transporter = nodemailer.createTransport({
  service: config.mailService,
  auth: {
    user: config.userName,
    pass: config.password
  }
});


// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

  function sendSms(message){
    var deferred = Q.defer();
      db.smsmessages.insert(message, function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                console.log("Message  "+message.message)
                nexmo.message.sendSms(config.from, message.phoneNumber, message.message);
                deferred.resolve();
            });
    return deferred.promise;
}

function getAllSms(){

}
function getSms(){

}