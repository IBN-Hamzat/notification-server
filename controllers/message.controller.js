require('rootpath')();
var config = require('config');
var express = require('express');
var router = express.Router();
var messageService = require('service/message.service');

// routes

router.post('/mail', sendMail);
router.get('/allmail', getAllMail);
router.get('/mail', getOneMail);

module.exports = router;


function sendMail(req, res) {
    console.log("req body " + req.body.phoneNumber)
    messageService.sendMail(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getAllMail(req, res) {
    messageService.getAll()
        .then(function (messages) {
            res.send(messages);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getOneMail(req, res) {
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
