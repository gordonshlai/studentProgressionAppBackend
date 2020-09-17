/**
 * @file index.js is the root file for this system
 * @author Gordon Lai
 */

const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/prod")(app);

/**
 * Port number
 * @type {string}
 */
const port = process.env.PORT || 3000;

/**
 * Server Object
 * @type {Server}
 */
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
