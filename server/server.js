const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const { dbConnect } = require('./db/mongoose');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

app.use(morgan('dev'));
const { PORT } = require('./config');

// app.get(
//   '/auth/spotify/callback',
//   passport.authenticate('spotify', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
// );

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// Catch-all 404
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Custom Error Handler
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
