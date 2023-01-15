const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser, logout } = require('../controllers/users');
const { joiName, joiEmail, joiPassword, joiId } = require('../utils/joi-validators');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: joiEmail(),
      password: joiPassword(),
    }),
  }),
  login
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: joiEmail(),
      password: joiPassword(),
      name: joiName(),
    }),
  }),
  createUser
);

router.post('/signout', celebrate({ body: Joi.object().keys({ _id: joiId() }) }), logout);

module.exports = router;
