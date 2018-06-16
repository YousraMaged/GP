"use strict";

module.exports = function (Bus) {

    Bus.remoteMethod("path", {
        http: { path: "/path", verb: "get" },
        accepts: [{ arg: "origin", type: "string" }, { arg: "destination", type: "string" }],
        returns: [{ arg: "Stations", type: "object" }, { arg: "Bus Number", type: "string"}]
    });

    Bus.path = function (origin, destination, cb) {
        console.log("Remote method working");
        Bus.find({fields: { Stations: true }}, function (err, bus) {
            cb(err, bus);
            bus.filter({"where":{ "and":[{ "origin": {"inq": "Stations"}}, { "destination": {"inq": "Stations"}}] }}, function (err, bus) {
                cb(err, bus);
            
            });

           

            // if (!valid) {
            //     console.log("not valid")
            // } else {
            //     let origin = value.origin;
            //     let destination = value.destination;
            //     for (let i = 0; i < this.Route.length; i++) {
            //         for (let j = 0; j < this.Route[i].Path.length; j++) {
            //             if (origin == this.Route[i].Path[j] && destination == this.Route[i].Path[j]) {
            //                 console.log(this.Route[i].number)
            //             } else {
            //                 console.log("false")
            //             }
            //         }
            //     }
            //     console.log(origin)
            //     console.log(destination)
            // }
        }
        
    );
    };
};
