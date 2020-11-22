const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const index = require('../routes/index');
const error = require('../middleware/error');


module.exports = function(app) {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan());
    app.use(express.static("public"));
    app.set('view engine', 'ejs');


    app.use('/', index);
    app.use(error);
}