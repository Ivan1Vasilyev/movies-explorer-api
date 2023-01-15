const { DEFAULT_ERROR_CODE } = require('../utils/constants');

const centralizedErrorHandler = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR_CODE, message } = err;
  return res
    .status(statusCode)
    .json({ message: statusCode === DEFAULT_ERROR_CODE ? 'На сервере произошла ошибка' : message });
};

module.exports = centralizedErrorHandler;
