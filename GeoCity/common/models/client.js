'use strict';

module.exports = function (Client) {

    Client.remoteMethod("getRole", {
        http: { path: "/getRole", verb: 'GET' },
        accepts: { arg: 'id', type: 'string' },
        returns: { arg: 'user', type: 'Object' }
    });

    Client.getRole = function (id, cb) {
        Client.findById(id, { fields: { role: 'true' } }, function (err, res) {
            cb(err, res)
        })
    }

    Client.remoteMethod("getNationalID", {
        http: { path: "/getNationalID", verb: 'GET' },
        accepts: { arg: 'id', type: 'string' },
        returns: { arg: 'nationalId', type: 'string' }
    });

    Client.getNationalID = function (id, cb) {
        Client.findById(id, { fields: { NationalID: 'true' } }, function (err, res) {
            cb(err, res)
        })
    }
};
