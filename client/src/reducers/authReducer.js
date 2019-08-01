import {
  SET_ACCESS_TOKEN_SUCCESS,
  SET_TOKEN_EXPIRATION_SUCCESS,
  LOG_OUT,
  LOGGED_IN
} from '../actions/auth';

const initialState = {
  accessToken: null,
  expiresIn: null,
  loading: false,
  loggedIn: false,
  currentUser: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken
      };
    case SET_TOKEN_EXPIRATION_SUCCESS:
      return {
        ...state,
        expiresIn: action.expiresIn
      };

    case LOGGED_IN:
      return { ...state, loggedIn: true, currentUser: action.currentUser };
    case LOG_OUT:
      return { ...state, expiresIn: null, authToken: null };
    default:
      return state;
  }
}
