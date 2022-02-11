const User = require('../../models/user');
const ValidationError = require('../../errors/ValidationError');
const { incorrectUserDataMessage } = require('../constants/constants');

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then(({ name, email }) => {
      res.status(200).send({ name, email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(incorrectUserDataMessage));
      } else {
        next(err);
      }
    });
};
