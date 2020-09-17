/**
 * Error middleware
 * @module middleware/error
 */

const winston = require("winston");

/**
 * Any internal server error arrose will be caught with this function.
 * @param {object} err - the error object
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {function} next - passes control to the next middleware
 */
module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  res
    .status(500)
    .send("Internal server error. Please contact the maintanence team.");
};
