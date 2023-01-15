const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { upDateUserData, getUserData } = require('../controllers/users');
const { joiName, joiEmail } = require('../utils/joi-validators');

router.get('/me', getUserData);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: joiName(true),
      email: joiEmail(true),
    }),
  }),
  upDateUserData,
);

module.exports = router;
