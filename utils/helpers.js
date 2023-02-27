const jwt = require('jsonwebtoken');
const { tokenKey } = require('./configs');

const jwtSign = (user, expiresIn) => jwt.sign({ _id: user._id }, tokenKey, { expiresIn });

const setCookies = (maxAge) => ({
  maxAge,
  httpOnly: true,
  sameSite: 'none',
  secure: true,
});

const getErrorMessages = (e) => Object.values(e.errors)
  .map((err) => err.message)
  .join(', ');

module.exports = { getErrorMessages, jwtSign, setCookies };
