'use strict';

module.exports = function(Test) {

    Test.remoteMethod("filter", {
        http: { path: "/filter", verb: "get" },
        accepts: { arg: 'id', type: 'string' },
        returns: { arg: 'geo', type: "Array" }
    });

    Test.filter = function(id, cb){
        Test.find({ "type" : id }, function(err, test){
            cb(err, test)
        })
    }

};