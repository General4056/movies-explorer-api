const User = require('../../models/user');
const ValidationError = require('../../errors/ValidationError');
const { incorrectUserDataMessage, userExistMessage } = require('../../constants/constants');
const ConflictError = require('../../errors/ConflictError');

module.exports.updateUser = (req, res, next) => {
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { ...req.body }, { new: true, runValidators: true })
    .then(({ name, email }) => {
      res.status(200).send({ name, email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(userExistMessage));
      }
      if (err.name === 'ValidationError') {
        next(new ValidationError(incorrectUserDataMessage));
      } else {
        next(err);
      }
    });
};
