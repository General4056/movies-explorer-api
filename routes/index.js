const router = require('express').Router();

const userRouter = require('./users');
const moviesRouter = require('./movies');
const { loginValidation, registrValidation } = require('../middlewares/validators');
const { loginUser } = require('../controllers/users/loginUser');
const { registerUser } = require('../controllers/users/registerUser');
const { isAuthorized } = require('../middlewares/auth');
const PageNotFound = require('../errors/PageNotFound');
const { pageNotFoundMessage } = require('../constants/constants');

router.post('/signin', loginValidation, loginUser);
router.post('/signup', registrValidation, registerUser);

router.use(isAuthorized);
router.use(userRouter);
router.use(moviesRouter);

router.use((req, res, next) => {
  next(new PageNotFound(pageNotFoundMessage));
});

module.exports = router;
