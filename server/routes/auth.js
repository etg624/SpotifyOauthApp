const router = require('express').Router();
const mogoose = require('mongoose');
const request = require('request-promise');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require('../config');
const User = require('../models/User');

router.get('/login', (req, res, next) => {
  const scopes = `user-read-private user-read-email playlist-modify-public
  playlist-read-collaborative
  playlist-read-private
  playlist-modify-private`;
  const redirect_uri = 'http://localhost:8080/api/auth/callback';

  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}${
      scopes ? '&scope=' + encodeURIComponent(scopes) : ''
    }&redirect_uri=${encodeURIComponent(redirect_uri)}`
  );
});

router.get('/callback', (req, res, next) => {
  const redirect_uri = 'http://localhost:8080/api/auth/callback';
  const code = req.query.code || null;

  const options = {
    url: 'https://accounts.spotify.com/api/token',
    form: { code, redirect_uri, grant_type: 'authorization_code' },
    headers: {
      Authorization: `Basic ${new Buffer.from(
        SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
      ).toString('base64')}`
    },
    json: true
  };
  request.post(options, (error, response, body) => {
    const { access_token, expires_in, refresh_token } = body;

    let uri = process.env.FRONTEND_uri || 'http://localhost:3000';
    res.redirect(
      `${uri}?accessToken=${access_token}&expiresIn=${expires_in}&refreshToken=${refresh_token}`
    );
  });
});

router.post('/login', (req, res, next) => {
  const { accessToken, displayName, spotifyId } = req.body;

  const newUser = { displayName, accessToken, spotifyId };

  return User.findOne(spotifyId).then(user => {
    if (user) {
      return user;
    } else {
      return User.create(newUser);
    }
  });
});
module.exports = router;
