const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const loginRouter = require('./login');
const auth = require('../middlewares/auth');

router.use(loginRouter);
router.use(auth);
router.use('/movies', movieRouter);
router.use('/users', userRouter);

module.exports = router;
