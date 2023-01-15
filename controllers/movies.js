const escape = require('escape-html');
const Movie = require('../models/movies');
const { NOT_CORRECT_MESSAGE, NOT_EXISTS_MESSAGE, CREATED_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/not-found');
const NotValidError = require('../errors/not-valid');
const NotAcceptedError = require('../errors/not-accepted');
const { getErrorMessages } = require('../utils/handle-errors');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).populate('owner');
    return res.json(movies);
  } catch (e) {
    return next(e);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const newCard = await Movie.create({
      owner: req.user._id,
      name: name ? escape(name) : name,
      link,
    });
    await newCard.populate('owner');
    return res.status(CREATED_CODE).json(newCard);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new NotValidError(getErrorMessages(e)));
    }
    return next(e);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const deletingCard = await Movie.findById(req.params.cardId).populate(['owner', 'likes']);
    if (!deletingCard) {
      return next(new NotFoundError(`${NOT_EXISTS_MESSAGE}: Несуществующий id карточки`));
    }

    if (req.user._id !== String(deletingCard.owner._id)) {
      return next(new NotAcceptedError('Вы не можете удалить чужую карточку'));
    }

    await deletingCard.remove();

    return res.json(deletingCard);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new NotValidError(`${NOT_CORRECT_MESSAGE}: Некорректный id карточки`));
    }
    return next(e);
  }
};

module.exports = {
  getMovies,
  deleteCard,
  createCard,
};
