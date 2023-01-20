require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { limiter, corsOptions, PORT, MONGO_PORT } = require('./utils/configs');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NOT_EXISTS_MESSAGE } = require('./utils/constants');
const NotFoundError = require('./errors/not-found');
const centralizedErrorHandler = require('./errors/centralized-error-handler');

const app = express();

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
