const router = require('express').Router();
const mogoose = require('mongoose');
const request = require('request-promise');
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  FRONTEND_URI
} = require('../config');

router.get('/login', (req, res, next) => {
  const scopes = 'user-read-private user-read-email';
  const redirect_uri = 'http://localhost:8080/api/auth/callback';
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}${
      scopes ? '&scope=' + encodeURIComponent(scopes) : ''
    }&redirect_uri=${encodeURIComponent(redirect_uri)}`
  );
});

router.get('/callback', (req, res, next) => {
  const redirect_uri = 'http://localhost:8080/api/auth/callback';
  const { code } = req.query || null;

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
    const access_token = body.access_token;
    console.log(body);

    res.redirect(`${FRONTEND_URI}?access_token=${access_token}`);
  });
});
module.exports = router;
