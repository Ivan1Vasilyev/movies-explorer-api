const router = require('express').Router();
const { deleteMovie, getMovies, createMovie } = require('../controllers/movies');
const { joiValidateMovieId, joiValidateMovie } = require('../utils/joi-validators');

router.get('/', getMovies);

router.post('/', joiValidateMovie(), createMovie);

router.delete('/:movieId', joiValidateMovieId(), deleteMovie);

module.exports = router;
