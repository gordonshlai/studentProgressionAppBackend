/**
 * Configuration function
 * @module startup/config
 */

const config = require("config");

/**
 * Throw an error if Json Web Token Private key is not defined in the environment variable.
 */
module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
