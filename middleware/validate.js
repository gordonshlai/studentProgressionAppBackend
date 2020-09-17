/**
 * Validate middleware
 * @module middleware/validate
 */

/**
 * return with response status of 400 when users input is invalid.
 * @param {function} validator - the input vallidation function
 */
module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
};
