const Movie = require('../../models/movie');

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};
