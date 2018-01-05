require('rootpath')();
var config = require('config');
var express = require('express');
var router = express.Router();
var clientService = require('service/client.service');

// routes

router.post('/clients', register);
router.get('/clients', getAll);
router.get('/client', getCurrent);
router.put('/clients/:_id', update);
router.delete('/clients/:_id', _delete);

module.exports = router;


function register(req, res) {
    console.log("req body " + req.body.phoneNumber)
    clientService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    clientService.getAll()
        .then(function (clients) {
            res.send(clients);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    clientService.getById(req.client.sub)
        .then(function (client) {
            if (client) {
                res.send(client);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    clientService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    clientService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}