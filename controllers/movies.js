const escape = require('escape-html');
const Movie = require('../models/movies');
const {
  NOT_CORRECT_MESSAGE,
  NOT_EXISTS_MESSAGE,
  CREATED_CODE,
  BASE_URL,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found');
const NotValidError = require('../errors/not-valid');
const NotAcceptedError = require('../errors/not-accepted');
const { getErrorMessages } = require('../utils/handle-errors');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.json(movies);
  } catch (e) {
    return next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const data = req.body;
    const newMovie = await Movie.create({
      owner: req.user._id,
      country: escape(data.country),
      director: escape(data.director),
      duration: data.duration,
      year: data.year,
      description: escape(data.description),
      image: `${BASE_URL}${data.image.url}`,
      thumbnail: `${BASE_URL}${data.image.formats.thumbnail.url}`,
      trailerLink: data.trailerLink,
      nameRU: escape(data.nameRU),
      nameEN: escape(data.nameEN),
      movieId: data.id,
    });
    return res.status(CREATED_CODE).json(newMovie);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new NotValidError(getErrorMessages(e)));
    }
    return next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const deletingovie = await Movie.findById(req.params.movieId);
    if (!deletingovie) {
      return next(new NotFoundError(`${NOT_EXISTS_MESSAGE}: Несуществующий id фильма`));
    }

    if (req.user._id !== String(deletingovie.owner)) {
      return next(new NotAcceptedError('Вы не можете удалить чужой фильм'));
    }

    await deletingovie.remove();

    return res.json(deletingovie);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new NotValidError(`${NOT_CORRECT_MESSAGE}: Некорректный id фильма`));
    }
    return next(e);
  }
};

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
