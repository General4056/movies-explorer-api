const bcrypt = require('bcrypt');
const ValidationError = require('../../errors/ValidationError');
const User = require('../../models/user');
const ConflictError = require('../../errors/ConflictError');
const { incorrectUserDataMessage, userExistMessage } = require('../../constants/constants');

const saltRounds = 10;

module.exports.registerUser = (req, res, next) => {
  const { name, email, password } = req.body;
  return bcrypt.hash(password, saltRounds).then((hash) => {
    User.create({ name, email, password: hash })
      .then((user) => {
        res.status(201).send({ name: user.name, _id: user._id, email: user.email });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError(incorrectUserDataMessage));
        }
        if (err.code === 11000) {
          next(new ConflictError(userExistMessage));
        } else {
          next(err);
        }
      });
  })
    .catch(next);
};
