"use strict";

module.exports = function (Bus) {

    Bus.remoteMethod("path", {
        http: { path: "/path", verb: "get" },
        accepts: [{ arg: "origin", type: "string" }, { arg: "destination", type: "string" }],
        returns: [{ arg: "busNumber", type: "string" }, { arg: "path", type: "object" }]
    });

    Bus.path = function (origin, destination, cb) {
        console.log("Remote method working");
        Bus.findOne({ where: { origin: origin } }, function (err, bus) {
            cb(err, bus);

            if (!valid) {
                console.log("not valid")
            } else {
                let origin = value.origin;
                let destination = value.destination;
                for (let i = 0; i < this.Route.length; i++) {
                    for (let j = 0; j < this.Route[i].Path.length; j++) {
                        if (origin == this.Route[i].Path[j] && destination == this.Route[i].Path[j]) {
                            console.log(this.Route[i].number)
                        } else {
                            console.log("false")
                        }
                    }
                }
                console.log(origin)
                console.log(destination)
            }
        }
        );
    };
};
