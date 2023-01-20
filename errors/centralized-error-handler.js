const { DEFAULT_ERROR_CODE, DEFAULT_ERROR_MESSAGE } = require('../utils/constants');

const centralizedErrorHandler = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR_CODE, message } = err;
  return res
    .status(statusCode)
    .json({ message: statusCode === DEFAULT_ERROR_CODE ? DEFAULT_ERROR_MESSAGE : message });
};

module.exports = centralizedErrorHandler;
