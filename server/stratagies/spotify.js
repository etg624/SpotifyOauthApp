const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require('../config');

passport.use(
  new SpotifyStrategy({
    clientID: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    callbackURL: 'http://localhost:8888/auth/spotify/callback'
  }),
  function(accessToken, SET_ACCESS_TOKEN_SUCCESS, expires_in, profile, done) {
    User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
      return done(err, user);
    });
  }
);
