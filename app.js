require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rootRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const { errorHandler } = require('./middlewares/errorHandler');
const { mongoUrlDevelopment } = require('./constants/config');
const { limiter } = require('./middlewares/limiter');
require('dotenv').config();

const { NODE_ENV, MONGO_URL } = process.env;
const PORT = process.env.PORT || 3000;
const mongodbUrl = NODE_ENV === 'production' ? MONGO_URL : mongoUrlDevelopment;

mongoose.connect(mongodbUrl);

const app = express();

app.use(requestLogger);

app.use(cors);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rootRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
