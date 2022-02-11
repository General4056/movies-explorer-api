const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const ValidationError = require('../../errors/ValidationError');
const { secretKeyDevelopment } = require('../constants/config');
const { invalidEmailMessage } = require('../constants/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : secretKeyDevelopment;

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    throw new ValidationError(invalidEmailMessage);
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
