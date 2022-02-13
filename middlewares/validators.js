const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

module.exports.userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(4).email(),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(4).email(),
    password: Joi.string().required().min(4),
  }),
});

module.exports.registrValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(4).email(),
    password: Joi.string().required().min(4),
  }),
});

module.exports.movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4),
    description: Joi.string().required().min(4),
    image: Joi.string()
      .required()
      .custom(validateURL, 'custom validation'),
    trailerLink: Joi.string()
      .required()
      .custom(validateURL, 'custom validation'),
    thumbnail: Joi.string()
      .required()
      .custom(validateURL, 'custom validation'),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
});

module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({ movieId: Joi.string().length(24).hex() }),
});
