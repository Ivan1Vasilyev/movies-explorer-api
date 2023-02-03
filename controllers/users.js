const bcryptjs = require('bcryptjs');
const escape = require('escape-html');
const User = require('../models/users');
const {
  CREATED_CODE,
  NOT_CORRECT_ID_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  SAME_EMAIL_MESSAGE,
  LOGIN_ERROR_MESSAGE,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found');
const NotValidError = require('../errors/not-valid');
const NotAuthorizedError = require('../errors/not-authorized');
const SameEmailError = require('../errors/same-email');
const { getErrorMessages, jwtSign, setCookies } = require('../utils/helpers');

const getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError(USER_NOT_FOUND_MESSAGE));
    }
    return res.json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new NotValidError(NOT_CORRECT_ID_MESSAGE));
    }
    return next(e);
  }
};

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name: escape(name), email },
      {
        runValidators: true,
        new: true,
      },
    );

    if (!updatedUser) {
      return next(new NotFoundError(USER_NOT_FOUND_MESSAGE));
    }

    return res.json(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new NotValidError(getErrorMessages(e)));
    }
    if (e.code === 11000) {
      return next(new SameEmailError(SAME_EMAIL_MESSAGE));
    }
    return next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const hash = await bcryptjs.hash(req.body.password, 10);
    const { name, email } = req.body;
    const newUser = await User.create({
      name: escape(name),
      email,
      password: hash,
    });

    const token = jwtSign(newUser, '7d');

    return res
      .status(CREATED_CODE)
      .cookie('jwt', token, setCookies(3600000 * 24 * 7))
      .json({
        name: newUser.name,
        email: newUser.email,
        _id: newUser._id,
      });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new NotValidError(getErrorMessages(e)));
    }
    if (e.code === 11000) {
      return next(new SameEmailError(SAME_EMAIL_MESSAGE));
    }
    return next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new NotAuthorizedError(LOGIN_ERROR_MESSAGE));

    const isLogged = await bcryptjs.compare(password, user.password);
    if (!isLogged) return next(new NotAuthorizedError(LOGIN_ERROR_MESSAGE));

    const token = jwtSign(user, '7d');
    const { name, _id } = user;

    return res.cookie('jwt', token, setCookies(3600000 * 24 * 7)).json({ name, email, _id });
  } catch (e) {
    return next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      return next(new NotFoundError(USER_NOT_FOUND_MESSAGE));
    }

    const token = jwtSign(user, -1);

    return res.cookie('jwt', token, setCookies(0)).json({ message: 'Выход из профиля' });
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new NotValidError(NOT_CORRECT_ID_MESSAGE));
    }
    return next(e);
  }
};

module.exports = {
  createUser,
  updateUser,
  login,
  getUserData,
  logout,
};
