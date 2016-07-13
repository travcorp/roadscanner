var expect = require('chai').expect;
var request = require('request');
var cheerio = require('cheerio');

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
      mockAPIServer.setTours([{name:"Best of Italy", bookingUrl: "http://bestofitaly", provider: "Trafalgar"}, {name:"Best of UK", bookingUrl:  "http://bestofuk", provider: "Contiki"}]);
  });

  this.When(/^the list of tours are requested$/, function (callback) {
    request('http://localhost:8080/tours', (error, response, body) => {
      this.$ = cheerio.load(body);
      callback();
    });
  });

  this.Then(/^tours are displayed$/, function () {
    var first = this.$('li').first();
    var last = this.$('li').last();

    expect(first.find('a').attr('href')).to.equal("http://bestofitaly");
    expect(first.text()).to.equal('Best of Italy [Trafalgar]');

    expect(last.find('a').attr('href')).to.equal("http://bestofuk");
    expect(last.text()).to.equal('Best of UK [Contiki]');
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
