const Movie = require('../../models/movie');
const NotFoundError = require('../../errors/NotFoundError');
const CastError = require('../../errors/CastError');
const ForbiddenError = require('../../errors/ForbiddenError');
const { haveNoRightsMessage, wrongIdMessage, invalidMovieIdMessage } = require('../../constants/constants');

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(wrongIdMessage);
      }
      if (String(movie.owner) !== req.user._id) {
        throw new ForbiddenError(haveNoRightsMessage);
      }
      return Movie.findByIdAndRemove(movieId)
        .then((deletedMovie) => res.status(200).send(deletedMovie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError(invalidMovieIdMessage));
      } else {
        next(err);
      }
    });
};
