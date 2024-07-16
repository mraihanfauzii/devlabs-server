const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const transactionsRouter = require('./routes/transactions');
const paymentRouter = require('./routes/payments');
const portofolioRouter = require('./routes/portofolios');
const ratingsRouter = require('./routes/ratings');

const morganMiddleware = require('./middlewares/morganMiddleware');

const app = express();

const BASE_URL = '/api';

// Use Morgan middleware for HTTP request logging
app.use(morganMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(`${BASE_URL}`, indexRouter);
app.use(`${BASE_URL}/v1/users`, usersRouter);
app.use(`${BASE_URL}/v1/projects`, projectsRouter);
app.use(`${BASE_URL}/v1/transactions`, transactionsRouter);
app.use(`${BASE_URL}/v1/payments`, paymentRouter);
app.use(`${BASE_URL}/v1/portofolios`, portofolioRouter);
app.use(`${BASE_URL}/v1/ratings`, ratingsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error response
  res.status(err.status || 500);
  res.send({
    success: false,
    message: err.message,
    code: err.status || 500,
  });
});

module.exports = app;
