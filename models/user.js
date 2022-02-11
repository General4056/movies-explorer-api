const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const AuthorizedError = require('../errors/AuthorizedError');
const { wrongEmailOrPasswordMessage } = require('../controllers/constants/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} невалидная ссылка!`,
    },
    required: true,
    unique: true,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new AuthorizedError(wrongEmailOrPasswordMessage),
        );
      }
      // user.password это хэш пароля в БД
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthorizedError(wrongEmailOrPasswordMessage),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
