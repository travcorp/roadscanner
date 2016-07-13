var expect = require('chai').expect;

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

  this.Then(/^tours are displayed$/, function () {
    expect(this.returnedTours.length).to.eql(1);
  }); 
}
