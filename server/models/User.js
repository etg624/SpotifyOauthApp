const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  displayName: String,
  accessToken: String,
  refreshToken: String,
  spotifyId: String
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('User', userSchema);
