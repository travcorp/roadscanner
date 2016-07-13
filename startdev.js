var mockAPI = require('./mock/mockAPI')(() => {
    mockAPI.setTours([{name:"Best of Italy", url: "http://google.com?q=Best+Of+Italy"}, {name:"Best of UK", url: "http://google.com?q=Best+Of+UK"}])
    const app = require('./app.js');
    app(null);
});