"use strict";

module.exports = function(Bus) {

  Bus.remoteMethod("test", {
    http: { path: "/test/:id", verb: "get" },
    accepts: {arg: 'id', type: 'number'},
    returns: {arg: 'bus', type: "Object" }
  });

    Bus.test = function (id, cb) {
        console.log("Remote method working");
        Bus.findOne({ where: { id: id } }, function (err, bus) {
            cb(err, bus);
        });
    };
};
