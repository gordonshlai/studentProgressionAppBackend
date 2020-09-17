/**
 * Students Router, contains the route handlers for /api/students end point.
 * @module routes/student
 */

const { Student } = require("../models/student");
const express = require("express");
const router = express.Router();

/**
 * Get rooute handler.
 */
router.get("/", async (req, res) => {
  /**
   * Array of Student objects returned from the database.
   */
  const students = await Student.find().sort("firstName");
  res.send(students);
});

module.exports = router;
