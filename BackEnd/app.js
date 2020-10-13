'use strict'

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const api = require('./routes/index');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload({createParentPath: true}));
app.use('/api', api);

module.exports = app;