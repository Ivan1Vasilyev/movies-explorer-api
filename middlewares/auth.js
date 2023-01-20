const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/not-authorized');
const { AUTH_ERROR_MESSAGE } = require('../utils/constants');
const { tokenKey } = require('../utils/configs');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new NotAuthorizedError(AUTH_ERROR_MESSAGE));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, tokenKey);
  } catch (e) {
    next(new NotAuthorizedError(AUTH_ERROR_MESSAGE));
    return;
  }

  req.user = { _id: payload._id };

  next();
};

module.exports = auth;
