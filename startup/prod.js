/**
 * Production function
 * @module startup/prod
 */

const helmet = require("helmet");
const compression = require("compression");

/**
 * Initialize the application with middleware functions
 * @param {Express} app - Express application
 */
module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
};
