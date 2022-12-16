const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('../src/database/models/model');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

// Use the imported routes file
app.use('/', routes);

module.exports = app;
