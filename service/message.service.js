var nodemailer = require('nodemailer');
const Nexmo = require('nexmo')
var config = require('config');
require('rootpath')();
var _ = require('lodash');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/exodusApp", { native_parser: true });
db.bind('messages');


var service = {};

service.sendMail= sendMail;
service.getAllMail = getAllMail;
service.getMail = getMail;

module.exports = service;


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

  function sendMail(message){
    var deferred = Q.defer();
    var mailOptions = {
      from: config.userName,
      to: message.email,
      subject: message.subject,
      text: message.message
      };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        deferred.reject(error.name + ': ' + error.message);
      console.log(error);
    } else {
       deferred.resolve();
      console.log('Email sent: ' + info.response);
    }});
    return deferred.promise;
}

function getAllMail(){

}
function getMail(){

}
