/**
 * Routes function
 * @module startup/routes
 */

const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const students = require("../routes/students");
const images = require("../routes/images");
const error = require("../middleware/error");

/**
 * Initialize the express application with routes handlers managing
 * requests for different end points.
 * @param {Express} app - Express application
 */
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/students", students);
  app.use("/api/images", images);
  app.use(error);
};
