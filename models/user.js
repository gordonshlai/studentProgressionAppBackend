/**
 * Users model,
 * provides a data structure for mongoose to import data into MongoDB database.
 * @module models/user
 */

const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

/**
 * The user schema, defines the information structure of the user.
 */
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  imageUrl: String,
  thumbnailUrl: String,
});

/**
 * Generate the json web token using the _id property from the
 * user object.
 */
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

/**
 * The mongoose user model
 */
const User = mongoose.model("User", userSchema);

/**
 * Validates the user input for the user object.
 * @param {object} user - the user object containing the input from the registration.
 */
function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().required().max(50),
    lastName: Joi.string().required().max(50),
    email: Joi.string().required().max(255).email(),
    password: Joi.string().required().min(5).max(255),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
