const jwt = require('jsonwebtoken');
const { secretKeyDevelopment } = require('../constants/config');
const { unauthorizedMessage } = require('../constants/constants');
const AuthorizedError = require('../errors/AuthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : secretKeyDevelopment;

const isAuthorized = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizedError(unauthorizedMessage);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new AuthorizedError(unauthorizedMessage);
  }
  req.user = payload;
  return next();
};

module.exports = { isAuthorized };
