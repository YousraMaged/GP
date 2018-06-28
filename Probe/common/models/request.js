'use strict';

module.exports = function (Request) {

    Request.remoteMethod("getByNumber", {
        http: { path: "/getRequestByNumber", verb: 'GET' },
        accepts: { arg: 'Number', type: 'string' },
        returns: { arg: 'Request', type: 'Object' }
    });

    Request.getByNumber = function (Number, cb) {
        Request.find({ where: { Number: Number }}, function (err, res) {
            cb(err, res);
        })
    }

};
