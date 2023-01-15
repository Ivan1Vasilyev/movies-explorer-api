const CREATED_CODE = 201;
const DEFAULT_ERROR_CODE = 500;
const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';
const NOT_CORRECT_MESSAGE = 'Некорректные данные';
const NOT_EXISTS_MESSAGE = 'Несуществующий путь';

const REGEXP_URL = /^https?:\/\/(www.)?[-.:/?#@!$&%'()_+~,;=a-zA-Z0-9]+$/;
const REGEXP_YEAR = /^(1|2)(0|9|8)\d{2,2}$/;
module.exports = {
  CREATED_CODE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  NOT_CORRECT_MESSAGE,
  NOT_EXISTS_MESSAGE,
  REGEXP_URL,
  REGEXP_YEAR,
};
