const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');

const {
  joivalidateRegister,
  joiValidateLogin,
  joiValidateUserId,
} = require('../utils/joi-validators');

router.post('/signin', joiValidateLogin(), login);

router.post('/signup', joivalidateRegister(), createUser);

router.post('/signout', joiValidateUserId(), logout);

module.exports = router;
