/**
 * Logging function
 * @module startup/logging
 */

const { add, exceptions, format, transports } = require("winston");
require("express-async-errors");

/**
 * Set up the logging methods using winston
 */
module.exports = function () {
  /**
   * Console logging format
   */
  const consoleLogFormat = format.combine(
    format.colorize(),
    format.prettyPrint(),
    format.simple()
  );

  exceptions.handle([
    new transports.Console({ format: consoleLogFormat }),
    new transports.File({ filename: "exceptions.log" }),
  ]);

  process.on("unhandledRejection", (error) => {
    throw error;
  });

  add(
    new transports.Console({
      format: consoleLogFormat,
      handleExceptions: true,
      handleRejections: true,
    })
  );
};
