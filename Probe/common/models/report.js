'use strict';

module.exports = function (Report) {

    Report.remoteMethod("getByNumber", {
        http: { path: "/getReportByNumber", verb: 'GET' },
        accepts: { arg: 'Number', type: 'number' },
        returns: { arg: 'Report', type: 'Object' }
    });

    Report.getByNumber = function (Number, cb) {
        Report.find({ where: { Number: Number } }, function (err, res) {
            cb(err, res);
        })
    }

};
