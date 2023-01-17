const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { deleteMovie, getMovies, createMovie } = require('../controllers/movies');
const { joiRequiredString, joiRequiredNumber, joiYear, joiUrl, joiId } = require('../utils/joi-validators');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: joiRequiredString(),
      director: joiRequiredString(),
      duration: joiRequiredNumber(),
      year: joiYear(),
      description: joiRequiredString(),
      image: joiUrl(),
      trailerLink: joiUrl(),
      thumbnail: joiUrl(),
      nameRU: joiRequiredString(),
      nameEN: joiRequiredString(),
      movieId: joiId(),
    }),
  }),
  createMovie,
);

router.delete('/:movieId', celebrate({ params: Joi.object().keys({ movieId: joiId() }) }), deleteMovie);

module.exports = router;
