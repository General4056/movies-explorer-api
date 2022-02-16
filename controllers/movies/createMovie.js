const Movie = require('../../models/movie');
const ValidationError = require('../../errors/ValidationError');
const { passedIncorrectDataMessage } = require('../../constants/constants');

module.exports.createMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then(({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
      _id,
    }) => {
      res.status(201).send({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner,
        _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(passedIncorrectDataMessage));
      } else {
        next(err);
      }
    });
};
