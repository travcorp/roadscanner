var expect = require('chai').expect;
var request = require('request');

var appServer;
var mockAPIServer;

module.exports = function () {

  this.Before(function(scenario, done) {
    if(appServer === undefined) {
      appServer = require('../../app')(() => {
        if(mockAPIServer === undefined) {
          mockAPIServer = require('../../mock/mockAPI')(done);
        }
      });
    } else {
      done();
    }
  });

  this.Given(/^A list of tours are available$/, function () {
      mockAPIServer.setTours([{name:"Best of Italy", url: ""}, {name:"Best of UK", url: ""}]);
  });

  this.When(/^the list of tours are requested$/, function (callback) {
    request('http://localhost:8080/tours', (error, response, body) => {
      this.returnedTours = body;
      callback();
    });
  });

  this.Then(/^tours are displayed$/, function () {
    expect(this.returnedTours).to.contain('Best of Italy');
    expect(this.returnedTours).to.contain('Best of UK');
  });

  this.Given(/^An api that returns no tours$/, function () {
    mockAPIServer.setTours([]);
  });

  this.When(/^The list of tours are requested$/, function (done) {
    request('http://localhost:8080/tours', (errors, response, body) => {
      this.responseBody = body;
      done();
    });
  });

  this.Then(/^A message "([^"]*)" is displayed$/, function (message) {
    expect(this.responseBody).to.equal(message);
  });
}
