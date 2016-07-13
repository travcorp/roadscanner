'use strict'
const request = require('request');
const expect = require('chai').expect;

module.exports = function () {

    this.Before(function(scenario, done) {
        this.app = require('../../app')(done);
    });

    this.After(function() {
        this.app.close();
        this.mockAPI.close();
    });

    this.Given(/^An api that returns no tours$/, function (done) {
        this.mockAPI = require('../../mock/mockAPI')(done);
        this.mockAPI.returnNoTours();
    });

    this.When(/^The list of tours are requested$/, function (done) {
        request('http://localhost:8080/tours/list', (errors, response, body) => {
            this.responseBody = body;
            done();
        });
    });

    this.Then(/^A message "([^"]*)" is displayed$/, function (message) {
        expect(this.responseBody).to.equal(message);
    });
}