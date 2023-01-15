const { Joi } = require('celebrate');
const { REGEXP_URL, REGEXP_YEAR } = require('./constants');

const joiRequiredString = () => Joi.string();
const joiRequiredNumber = () => Joi.number().required();
const joiName = () => Joi.string().required().min(2).max(30);
const joiYear = () => Joi.string().required().pattern(REGEXP_YEAR);
const joiUrl = () => Joi.string().required().pattern(REGEXP_URL);
const joiEmail = () => Joi.string().required().email({ minDomainSegments: 2 });
const joiPassword = () => Joi.string().required().min(4);
const joiId = () => Joi.string().hex().required().length(24);

module.exports = {
  joiRequiredString,
  joiRequiredNumber,
  joiName,
  joiYear,
  joiUrl,
  joiEmail,
  joiPassword,
  joiId,
};
