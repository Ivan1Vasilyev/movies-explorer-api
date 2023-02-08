const CREATED_CODE = 201;
const DEFAULT_ERROR_CODE = 500;
const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';
const NOT_EXISTS_MESSAGE = 'Несуществующий путь';
const NOT_CORRECT_ID_MESSAGE = 'Некорректные данные: некорректный id';
const NOT_EXISTS_ID_MESSAGE = `${NOT_EXISTS_MESSAGE}: несуществующий id`;
const USER_NOT_FOUND_MESSAGE = `${NOT_EXISTS_MESSAGE}: пользователь не найден.`;
const NOT_OWNER_MESSAGE = 'Вы не можете удалить чужой фильм';
const SAME_EMAIL_MESSAGE = 'Пользователь с таким email уже зарегистрирован';
const LOGIN_ERROR_MESSAGE = 'Неправильные почта или пароль';
const AUTH_ERROR_MESSAGE = 'Необходима авторизация';

const REGEXP_URL = /^https?:\/\/(www.)?[-.:/?#@!$&%'()_+~,;=a-zA-Z0-9]+$/;
const REGEXP_YEAR = /^(1|2)(0|9|8)\d{2,2}$/;
const REGEXP_NAME = /^[-_\sa-zа-яё]+$/i;

module.exports = {
  CREATED_CODE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  NOT_EXISTS_MESSAGE,
  NOT_CORRECT_ID_MESSAGE,
  NOT_EXISTS_ID_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  NOT_OWNER_MESSAGE,
  SAME_EMAIL_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGE,
  REGEXP_URL,
  REGEXP_YEAR,
  REGEXP_NAME,
};
