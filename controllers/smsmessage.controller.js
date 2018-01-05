require('rootpath')();
var config = require('config');
var express = require('express');
var router = express.Router();
var messageService = require('service/smsmessage.service');
 
// routes

router.post('/sms', sendSms);
router.get('/allsms', getAllSms);
router.get('/sms', getOneSms);

module.exports = router;


function sendSms(req, res) {
    console.log("req body " + req.body.phoneNumber)
    messageService.sendSms(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getAllSms(req, res) {
    messageService.getAllSms()
        .then(function (messages) {
            res.send(messages);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getOneSms(req, res) {
    messageService.getById(req.message.sub)
        .then(function (message) {
            if (message) {
                res.send(message);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

