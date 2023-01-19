const { celebrate, Joi } = require('celebrate');
const { REGEXP_URL, REGEXP_YEAR, REGEXP_NAME } = require('./constants');

const joiRequiredString = () => Joi.string().required();
const joiEmptyString = () => Joi.string().empty('');
const joiRequiredNumber = () => Joi.number().required();
const joiName = () => Joi.string().required().pattern(REGEXP_NAME).min(2)
  .max(30);
const joiYear = () => Joi.string().required().pattern(REGEXP_YEAR);
const joiUrl = () => Joi.string().required().pattern(REGEXP_URL);
const joiEmail = () => Joi.string().required().email({ minDomainSegments: 2 });
const joiPassword = () => Joi.string().required().min(4);
const joiId = (source, id) => celebrate(
  { [source]: Joi.object().keys({ [id]: Joi.string().hex().required().length(24) }) },
);

const joivalidateRegister = () => celebrate({
  body: Joi.object().keys({
    email: joiEmail(),
    password: joiPassword(),
    name: joiName(),
  }),
});

const joiValidateLogin = () => celebrate({
  body: Joi.object().keys({
    email: joiEmail(),
    password: joiPassword(),
  }),
});

const joiValidateUserData = () => celebrate({
  body: Joi.object().keys({
    email: joiEmail(),
    name: joiName(),
  }),
});

const joiValidateUserId = () => joiId('body', '_id');

const joiValidateMovieId = () => joiId('params', 'movieId');

const joiValidateMovie = () => celebrate({
  body: Joi.object().keys({
    id: joiRequiredNumber(),
    nameRU: joiRequiredString(),
    nameEN: joiRequiredString(),
    director: joiRequiredString(),
    country: joiRequiredString(),
    year: joiYear(),
    duration: joiRequiredNumber(),
    description: joiRequiredString(),
    trailerLink: joiUrl(),
    created_at: joiEmptyString(),
    updated_at: joiEmptyString(),
    image: {
      id: Joi.number(),
      name: joiEmptyString(),
      alternativeText: joiEmptyString(),
      caption: joiEmptyString(),
      width: Joi.number(),
      height: Joi.number(),
      formats: {
        thumbnail: {
          hash: joiEmptyString(),
          ext: joiEmptyString(),
          mime: joiEmptyString(),
          width: Joi.number(),
          height: Joi.number(),
          size: Joi.number(),
          path: Joi.any(),
          url: joiRequiredString(),
        },
        small: Joi.any(),
      },
      hash: joiEmptyString(),
      ext: joiEmptyString(),
      mime: joiEmptyString(),
      size: Joi.number(),
      url: joiRequiredString(),
      previewUrl: joiEmptyString(),
      provider: joiEmptyString(),
      provider_metadata: Joi.any(),
      created_at: joiEmptyString(),
      updated_at: joiEmptyString(),
    },
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
