const router = require('express').Router();
const { getMovies } = require('../controllers/movies/getMovies');
const { createMovie } = require('../controllers/movies/createMovie');
const { deleteMovie } = require('../controllers/movies/deleteMovie');

const { movieValidation, movieIdValidation } = require('../middlewares/validators');

router.get('/movies', getMovies);
router.post('/movies', movieValidation, createMovie);
router.delete('/movies/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
