const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';

const jwtPublicKey = 'b4a31f28503b509c62e2ec977b80250114100c6f3fd3ce7f2212132cd98b1dd0';
const {
  PORT = 3001,
  MONGO_PORT = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const tokenKey = NODE_ENV === 'production' ? JWT_SECRET : jwtPublicKey;

const allowedCors = ['http://localhost:3001'];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = {
  limiter,
  corsOptions,
  PORT,
  MONGO_PORT,
  baseUrl,
  tokenKey,
};
