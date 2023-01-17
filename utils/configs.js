const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

const mongoPortDev = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const jwtPublicKey = 'b4a31f28503b509c62e2ec977b80250114100c6f3fd3ce7f2212132cd98b1dd0';

const allowedCors = ['http://localhost:3000'];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = { limiter, corsOptions, mongoPortDev, jwtPublicKey };
