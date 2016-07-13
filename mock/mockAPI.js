'use strict'

class MockAPIServer {

    constructor(done) {
        console.log("Starting mock tour API server");
        var express = require("express");
        var http = require('http');
        var app = express();

        app.get('/tours', (request, response) => {
            if(this.returnNoTours) {
                response.send("[]");
            }
        });

        app.set('port', 9999);
        this.server = http.createServer(app);
        this.server.listen(app.get('port'), function () {
            console.log("Mock tour API created : " + app.get('port'));
            done();
        });
    }

    returnNoTours() {
        this.returnNoTours = true;
    }

    close() {
        this.server.close();
    }
}
module.exports = function (done) {
    return new MockAPIServer(done);
}
