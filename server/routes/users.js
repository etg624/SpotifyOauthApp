const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  return User.findById(id).then(user => console.log(user));
});

module.exports = router;
