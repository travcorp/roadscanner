var expect = require('chai').expect;
var request = require('request');


module.exports = function () {

  var returnedTours;
  var toursService = {
    tours:function(){
      return [{name: "The Tour", url:"http://www.google.com"}];
    }
  }

  this.Given(/^A list of tours are available$/, function () {
  });

  this.When(/^the list of tours are requested$/, function () {
    this.returnedTours = toursService.tours();
  });

  this.Then(/^tours are displayed$/, function (collback) {
      request('http://localhost:8080', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	      expect(body).to.contain('The Tour');
              collback();
	  }
      });
    

  }); 
}
