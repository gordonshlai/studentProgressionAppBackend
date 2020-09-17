/**
 * Auth Router, contains the route handlers for /api/users end point.
 * @module routes/auth
 */

const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const validateWith = require("../middleware/validate");

/**
 * post request route handler
 */
router.post("/", validateWith(validateAuth), async (req, res) => {
  /**
   * user object
   */
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  /**
   * Validate Password
   * @type {boolean}
   */
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  /**
   * json web token
   * @type{string}
   */
  const token = user.generateAuthToken();
  res.send(token);
});

/**
 * Validates the user input from login.
 * @param {object} req - the request object
 */
function validateAuth(req) {
  const schema = Joi.object({
    email: Joi.string().required().max(255).email(),
    password: Joi.string().required(),
  });

  return schema.validate(req);
}

module.exports = router;
