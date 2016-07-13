'use strict'

var express = require("express");
var http = require('http');
var request = require('request');

class AppServer {

    constructor(done) {
        console.log("Starting tour comparison server");
        var app = express();
    	var exphbs  = require('express-handlebars');

        var toursAPIURL = process.env.ROADSCANNER_API_URL || "http://localhost:9999";

        app.engine('handlebars', exphbs({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');

        app.get('/tours', function (req, res) {
            request(toursAPIURL +"/tours", function(errors, resp, body) {
                var tourList = JSON.parse(body);
                if(tourList.length === 0) {
                    res.send("No tours available");
                } else {
                    res.render('listTours', {tours: tourList});
                }
            });
        });

        app.set('port', process.env.PORT || 8080);
        this.server = http.createServer(app);
        this.server.listen(app.get('port'), function () {
            console.log("Started roadscanner-ui server : " + app.get('port'));
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
