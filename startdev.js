var mockAPI = require('./mock/mockAPI')(() => {
    mockAPI.setTours([{name:"Best of Italy", bookingUrl: "http://google.com?q=Best+Of+Italy"}, {name:"Best of UK", bookingUrl: "http://google.com?q=Best+Of+UK"}])
    const app = require('./app.js');
    app(null);
});