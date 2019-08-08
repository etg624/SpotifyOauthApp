import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import qs from 'query-string';
import {
  setAccessToken,
  setTokenExpiration,
  logOut,
  logIn
} from '../actions/auth';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const parsed = qs.parse(window.location.search);
    const { accessToken, expiresIn } = parsed;
    const { dispatch } = this.props;
    dispatch(setAccessToken(accessToken));
    dispatch(setTokenExpiration(expiresIn));
    dispatch(logIn());

    if (!accessToken) return;
  }

  render() {
    const { loggedIn } = this.props.auth;
    return (
      <div>
        <button
          onClick={() =>
            (window.location = 'http://localhost:8080/api/auth/login')
          }
        >
          Sign in with Spotify
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(Login);
