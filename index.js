require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV;
const stage = require('./config');

const routes = require('./routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

if (environment !== 'production') {
    app.use(logger('dev'));
}

app.use('/api/v1', routes(router));

app.listen(`${stage[environment].port}`, () => {
    console.log(`server now listening at localhost:${stage[environment].port}`)
})

module.exports = app;