import { API_BASE_URL } from '../../config';

export const SET_ACCESS_TOKEN_SUCCESS = 'SET_ACCESS_TOKEN_SUCCESS';
export const setAccessToken = accessToken => ({
  type: SET_ACCESS_TOKEN_SUCCESS,
  accessToken
});

export const SET_TOKEN_EXPIRATION_SUCCESS = 'SET_TOKEN_EXPIRATION_SUCCESS';
export const setTokenExpiration = expiresIn => ({
  type: SET_TOKEN_EXPIRATION_SUCCESS,
  expiresIn
});

export const SET_REFRESH_TOKEN_SUCCESS = 'SET_REFRESH_TOKEN_SUCCESS';
export const setRefreshToken = refreshToken => ({
  type: SET_REFRESH_TOKEN_SUCCESS,
  refreshToken
});

export const LOGGED_IN = 'LOGGED_IN';
export const loggedIn = currentUser => ({
  type: LOGGED_IN,
  currentUser
});

export const logIn = () => (dispatch, getState) => {
  const { accessToken, refreshToken } = getState().auth;

  let data;

  return fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(_data => {
      data = _data;
      return data;
    })
    .then(postData => {
      console.log(postData);
      const { display_name, id } = postData;
      fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          displayName: display_name,
          spotifyId: id,
          accessToken,
          refreshToken
        })
      });
    })
    .then(res => dispatch(loggedIn()));
};

export const LOG_OUT = 'LOG_OUT';
export const logOut = () => ({ type: LOG_OUT });
