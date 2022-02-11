require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { loginValidation, registrValidation } = require('./middlewares/validators');
const { registerUser } = require('./controllers/users/registerUser');
const { loginUser } = require('./controllers/users/loginUser');
const rootRouter = require('./routes/index');
const { isAuthorized } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const PageNotFound = require('./errors/PageNotFound');
const { errorHandler } = require('./middlewares/errorHandler');
const { mongoUrlDevelopment } = require('./controllers/constants/config');
const { pageNotFoundMessage } = require('./controllers/constants/constants');
const { limiter } = require('./middlewares/limiter');
require('dotenv').config();

const { NODE_ENV, MONGO_URL } = process.env;
const PORT = process.env.PORT || 3000;
const mongodbUrl = NODE_ENV === 'production' ? MONGO_URL : mongoUrlDevelopment;

mongoose.connect(mongodbUrl);

const app = express();

app.use(cors);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', loginValidation, loginUser);
app.post('/signup', registrValidation, registerUser);

app.use(isAuthorized);

app.use('/', rootRouter);

app.use((req, res, next) => {
  next(new PageNotFound(pageNotFoundMessage));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
