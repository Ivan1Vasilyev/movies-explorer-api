const escape = require('escape-html');
const Movie = require('../models/movies');
const {
  NOT_CORRECT_ID_MESSAGE,
  NOT_EXISTS_ID_MESSAGE,
  NOT_OWNER_MESSAGE,
  CREATED_CODE,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found');
const NotValidError = require('../errors/not-valid');
const NotAcceptedError = require('../errors/not-accepted');
const { getErrorMessages } = require('../utils/helpers');

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
      image: data.image,
      thumbnail: data.thumbnail,
      trailerLink: data.trailerLink,
      nameRU: escape(data.nameRU),
      nameEN: escape(data.nameEN),
      movieId: data.movieId,
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
    const deletingMovie = await Movie.findById(req.params.movieId);
    if (!deletingMovie) {
      return next(new NotFoundError(NOT_EXISTS_ID_MESSAGE));
    }

    if (req.user._id !== String(deletingMovie.owner)) {
      return next(new NotAcceptedError(NOT_OWNER_MESSAGE));
    }

    await deletingMovie.remove();

    return res.json(deletingMovie);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new NotValidError(NOT_CORRECT_ID_MESSAGE));
    }
    return next(e);
  }
};

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
