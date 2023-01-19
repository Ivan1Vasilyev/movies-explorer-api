const router = require('express').Router();
const { updateUser, getUserData } = require('../controllers/users');
const { joiValidateUserData } = require('../utils/joi-validators');

router.get('/me', getUserData);

router.patch('/me', joiValidateUserData(), updateUser);

module.exports = router;
