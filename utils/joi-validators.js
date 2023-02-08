const { celebrate, Joi } = require('celebrate');
const { REGEXP_URL, REGEXP_YEAR, REGEXP_NAME } = require('./constants');

const joiRequiredString = () => Joi.string().required();
const joiRequiredNumber = () => Joi.number().required();
const joiName = () => Joi.string().required().pattern(REGEXP_NAME).min(2).max(30);
const joiYear = () => Joi.string().required().pattern(REGEXP_YEAR);
const joiUrl = () => Joi.string().required().pattern(REGEXP_URL);
const joiEmail = () => Joi.string().required().email({ minDomainSegments: 2 });
const joiPassword = () => Joi.string().required().min(4);
const joiId = (source, id) =>
  celebrate({ [source]: Joi.object().keys({ [id]: Joi.string().hex().required().length(24) }) });

const joivalidateRegister = () =>
  celebrate({
    body: Joi.object().keys({
      email: joiEmail(),
      password: joiPassword(),
      name: joiName(),
    }),
  });

const joiValidateLogin = () =>
  celebrate({
    body: Joi.object().keys({
      email: joiEmail(),
      password: joiPassword(),
    }),
  });

const joiValidateUserData = () =>
  celebrate({
    body: Joi.object().keys({
      email: joiEmail(),
      name: joiName(),
    }),
  });

const joiValidateUserId = () => joiId('body', '_id');

const joiValidateMovieId = () => joiId('params', 'movieId');

const joiValidateMovie = () =>
  celebrate({
    body: Joi.object().keys({
      nameRU: joiRequiredString(),
      nameEN: joiRequiredString(),
      director: joiRequiredString(),
      country: joiRequiredString(),
      year: joiYear(),
      duration: joiRequiredNumber(),
      description: joiRequiredString(),
      trailerLink: joiUrl(),
      image: joiUrl(),
    }),
  });

module.exports = {
  joivalidateRegister,
  joiValidateLogin,
  joiValidateUserData,
  joiValidateMovie,
  joiValidateUserId,
  joiValidateMovieId,
};
