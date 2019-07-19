require('dotenv').config();
module.exports = {
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/rotify',
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/rotify_test',
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  FRONTEND_URI: process.env.FRONTEND_URI || 'http:localhost:3000'
};
