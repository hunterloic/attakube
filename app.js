require("dotenv").config();
const express = require("express");
const logger = require("./middleware/logger");

const app = express();

logger.info(`app name: ${process.env.APP_NAME}`);
logger.info(`env: ${process.env.NODE_ENV}`);

require('./startup/logging');
require('./startup/routes')(app);
const server = require('./startup/server')(app);
require('./startup/socket')(server);
