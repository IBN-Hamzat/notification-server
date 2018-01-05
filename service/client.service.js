require('rootpath')();
var config = require('config');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/exodusApp", { native_parser: true });
db.bind('clients');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


function getAll() {
    var deferred = Q.defer();

    db.clients.find().toArray(function (err, clients) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(clients
        );
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.clients.findById(_id, function (err, client) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (client) {
            // return client (without hashed password)
            deferred.resolve();
        } else {
            // client not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}
// function create(clientParam) {
//     var deferred = Q.defer();

//     // validation
//     db.clients.findOne(
//         { phoneNumber: clientParam.phoneNumber },
//         function (err, client) {
//             if (err) deferred.reject(err.name + ': ' + err.message);

//             if (client) {
//                 // clientname already exists
//                 deferred.reject('phoneNumber "' + clientParam.phoneNumber + '" is already taken');
//             } else {
//                 createClient(); 
//             }
//         });
// }

function create(client) {
    var deferred = Q.defer();
    //console.log("client phone "+client.firstName)
    db.clients.insert(client, function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve();
    });


    return deferred.promise;
}


function update(_id, clientParam) {
    var deferred = Q.defer();

    // validation
    db.clients
        .findById(_id, function (err, client) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            else
                updateclient();

        });

    function updateclient() {
        // fields to update
        var set = {
            firstName: clientParam.firstName,
            lastName: clientParam.lastName,
            middleName: clientParam.middleName,
            phoneNumber: clientParam.phoneNumber,
        };
        db.clients
            .update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.clients
        .remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });
    return deferred.promise;
}