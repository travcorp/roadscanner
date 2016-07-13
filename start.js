if(process.env.ROADSCANNER_API_URL === undefined) {
    throw Error("Environment variable ROADSCANNER_API_URL not set!");
}

const app = require('./app.js');
app(null);