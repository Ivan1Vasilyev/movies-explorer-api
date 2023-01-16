require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NOT_EXISTS_MESSAGE } = require('./utils/constants');
const NotFoundError = require('./errors/not-found');
const centralizedErrorHandler = require('./errors/centralized-error-handler');

const { PORT = 3000, MONGO_PORT = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

const allowedCors = ['http://localhost:3000'];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(requestLogger);
app.use(limiter);
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_EXISTS_MESSAGE));
});
app.use(errorLogger);
app.use(errors());

app.use(centralizedErrorHandler);

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_PORT, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(`Can't connect to MongoDB. ${err}`);
    return;
  }
  console.log('connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`connected to port: ${PORT}`);
  });
});
