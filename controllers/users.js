const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
const User = require('../models/users');
const { NOT_CORRECT_MESSAGE, NOT_EXISTS_MESSAGE, CREATED_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/not-found');
const NotValidError = require('../errors/not-valid');
const NotAuthorizedError = require('../errors/not-authorized');
const SameEmailError = require('../errors/same-email');
const { getErrorMessages } = require('../utils/handle-errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError(`${NOT_EXISTS_MESSAGE}: Пользователь не найден.`));
    }
    return res.json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new NotValidError(`${NOT_CORRECT_MESSAGE}: Некорректный id`));
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
      return next(new NotFoundError(`${NOT_EXISTS_MESSAGE}: Пользователь не найден.`));
    }

    return res.json(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new NotValidError(getErrorMessages(e)));
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
    return res.status(CREATED_CODE).json({
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
    });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new NotValidError(getErrorMessages(e)));
    }
    if (e.code === 11000) {
      return next(new SameEmailError('Пользователь с таким email уже зарегистрирован'));
    }
    return next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new NotAuthorizedError('Неправильные почта или пароль'));
    }

    const isLogged = await bcryptjs.compare(password, user.password);
    if (!isLogged) {
      return next(new NotAuthorizedError('Неправильные почта или пароль'));
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'jwt-secret-key',
      { expiresIn: '7d' },
    );
    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .json({ message: 'Вы авторизованы!' });
  } catch (e) {
    return next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      return next(new NotFoundError(`${NOT_EXISTS_MESSAGE}: Пользователь не найден.`));
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'jwt-secret-key',
      { expiresIn: -1 },
    );

    return res
      .cookie('jwt', token, {
        maxAge: 0,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .json({ message: 'Выход из профиля' });
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new NotValidError(`${NOT_CORRECT_MESSAGE}: Некорректный id`));
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
