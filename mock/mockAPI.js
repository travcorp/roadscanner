'use strict'
var express = require("express");
var http = require('http');

class MockAPIServer {

    constructor(done) {
        console.log("Starting mock tour API server");
        var app = express();
        app.get('/tours', (request, response) => {
           response.send(JSON.stringify(this.tours));
        });

        app.set('port', 9999);
        this.server = http.createServer(app);
        this.server.listen(app.get('port'), function () {
            console.log("Mock tour API created : " + app.get('port'));
            done();
        });
    }

    setTours(tours) {
        this.tours = tours;
    }

    close() {
        this.server.close();
    }
}
module.exports = function (done) {
    return new MockAPIServer(done);
}
