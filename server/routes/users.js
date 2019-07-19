const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user');

/* ========== GET USER ========== */
// router.get('/:id', (req, res, next) => {
//   const userId = req.user.id;
//   console.log('User is ', req.user, 'User ID is', userId);
//   // res.json(userId);
// });

/* ========== POST USERS ========== */
router.post('/', (req, res, next) => {
  res.send('USER!');
});

module.exports = router;
