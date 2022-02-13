const mongoose = require('mongoose');
const validator = require('validator');
const { mongoInvalidUrlMessage } = require('../constants/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 4,
  },
  description: {
    type: String,
    required: true,
    minlength: 4,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} ${mongoInvalidUrlMessage}`,
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} ${mongoInvalidUrlMessage}`,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} ${mongoInvalidUrlMessage}`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
  },
});

module.exports = mongoose.model('movie', movieSchema);
