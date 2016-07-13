'use strict'

class AppServer {

    constructor(done) {
        console.log("Starting tour comparison server");
        var express = require("express");
        var http = require('http');
        var app = express();
        var request = require('request');

        var toursAPIURL = "http://localhost:9999";

        app.get('/tours/list', function (req, res) {
            request(toursAPIURL +"/tours", function(errors, resp, body) {
                var tourList = JSON.parse(body);
                if(tourList.length === 0) {
                    res.send("No tours available");
                }
            });
        });

        app.set('port', 8080);
        this.server = http.createServer(app);
        this.server.listen(app.get('port'), function () {
            console.log("Mock tour API created : " + app.get('port'));
            done();
        });
    }

    close() {
        this.server.close();
    }
}

module.exports = function (done) {
    return new AppServer(done);
}