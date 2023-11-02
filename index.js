require('dotenv').config();
const express = require('express');
const body_parser = require('body-parser')
const cors = require('cors');
const app = express();
const path = require('path');
const route = require('./src/route/route_control')
const dbConnection = require('./src/config/database/dbConnection')
const mongoose = require('mongoose')

dbConnection.dbConnect(process.env.mongoURI)

// middleware for post body parameter
app.use(body_parser.urlencoded())

// Basic Configuration
const port = process.env.PORT || 5000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

// initiate routes of website
route(app);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
