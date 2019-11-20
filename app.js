const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const usersRouter = require('./routes/api/users');
const cors = require('cors');
const app = express();

dotenv.config();

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    //useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch(error => console.log(error));

const db = mongoose.connection;

db.once('open', () => {
  console.log('Database connection successful');
});

app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
