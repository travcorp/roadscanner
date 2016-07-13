var expect = require('chai').expect;
var request = require('request');


module.exports = function () {

  this.Before(function(scenario, done) {
    this.app = require('../../app')(done);
  });

  this.After(function() {
    this.app.close();
  });

  var returnedTours;
  var toursService = {
    tours:function(){
	return [{name: "Best of Italy", url:"http://localhost:8080/tours/1"},
		{name: "Best of UK", url:"http://localhost:8080/tours/2"}];
    }
  }

  this.Given(/^A list of tours are available$/, function () {
  });

  this.When(/^the list of tours are requested$/, function () {
    this.returnedTours = toursService.tours();
  });

  this.Then(/^tours are displayed$/, function (collback) {
      request('http://localhost:8080/tours', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	      expect(body).to.contain('The Tour');
              collback();
	  }
      });
    

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
