const User = require('../../models/user');
const NotFoundError = require('../../errors/NotFoundError');
const { noSuchUserMessage } = require('../../constants/constants');

module.exports.getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(noSuchUserMessage);
      }
      const { name, email } = user;
      return res.status(200).send({ name, email });
    })
    .catch(next);
};
