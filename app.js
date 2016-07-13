'use strict'

var express = require("express");
var http = require('http');
var request = require('request');

class AppServer {

    constructor(done) {
        console.log("Starting tour comparison server");
        var app = express();

        var toursAPIURL = "http://localhost:9999";

        app.get('/tours', function (req, res) {
            res.send('The Tour\n');
        });

        app.get('/tours/list', function (req, res) {
            request(toursAPIURL +"/tours", function(errors, resp, body) {
                var tourList = JSON.parse(body);
                if(tourList.length === 0) {
                    res.send("No tours available");
                }
            });
        });

        app.set('port', process.env.PORT || 8080);
        this.server = http.createServer(app);
        this.server.listen(app.get('port'), function () {
            console.log("Mock tour API created : " + app.get('port'));
            if(done) {
                done();
            }
        });
    }

    close() {
        this.server.close();
    }
}

module.exports = function (done) {
    return new AppServer(done);
}
