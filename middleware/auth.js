/**
 * Auth middleware
 * @module middleware/auth
 */

const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * Validates the Json Web Token, deocodes the Json Web Token if valid.
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {function} next - passes control to the next middleware function
 */
module.exports = function (req, res, next) {
  /**
   * Authentication token from the request header.
   */
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    /**
     * The decoded token, containing the user object.
     */
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
