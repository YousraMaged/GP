'use strict';

module.exports = function (Client) {

    Client.remoteMethod("getRole", {
        http: { path: "/getRole", verb: 'GET' },
        accepts: { arg: 'id', type: 'string' },
        returns: { arg: 'user', type: 'Object' }
    });

    Client.getRole = function (id, cb) {
        Client.findById(id, { fields: { role: 'true' } }, function (err, res) {
            //console.log(res.role);
            cb(err, res)
        })
    }
};
