const CREATED_CODE = 201;
const DEFAULT_ERROR_CODE = 500;
const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';
const NOT_CORRECT_MESSAGE = 'Некорректные данные';
const NOT_EXISTS_MESSAGE = 'Несуществующий путь';
const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const REGEXP_URL = /^https?:\/\/(www.)?[-.:/?#@!$&%'()_+~,;=a-zA-Z0-9]+$/;
const REGEXP_YEAR = /^(1|2)(0|9|8)\d{2,2}$/;
const REGEXP_NAME = /[-_\sa-zа-я]+/i;

module.exports = {
  CREATED_CODE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  NOT_CORRECT_MESSAGE,
  NOT_EXISTS_MESSAGE,
  BASE_URL,
  REGEXP_URL,
  REGEXP_YEAR,
  REGEXP_NAME,
};
