'use strict';

module.exports = function (Client) {

    Client.remoteMethod("getRole", {
        http: { path: "/getRole", verb: 'GET' },
        accepts: { arg: 'id', type: 'string' },
        returns: { arg: 'user', type: 'Object' }
    });

    Client.getRole = function(id, cb){
        Client.find({ "id" : id }, function(err, res){
            console.log(err);
            console.log(res);
            cb(err, res)
        })
    }
};
