/**
 * Images Router, contains the route handlers for /api/images end point.
 * @module routes/images
 */

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const express = require("express");
const router = express.Router();

/**
 * GridFS object
 */
let gfs;
mongoose.connection.once("open", () => {
  /**
   * Initialize GridFS stream.
   */
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("images");
});

/**
 * Get request route handler.
 */
router.get("/:filename", async (req, res) => {
  /**
   * The image returned from the database.
   */
  const file = await gfs.files.findOne({ filename: req.params.filename });
  if (!file) return res.status(404).send("No files exist.");

  /**
   * The read stream.
   */
  const readstream = gfs.createReadStream(file.filename);
  readstream.pipe(res);
});

module.exports = router;
