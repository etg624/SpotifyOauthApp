import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API_BASE_URL } from '../config';
class Profile extends Component {
  componentDidMount() {
    fetch(`${API_BASE_URL}/users`);
  }

  render() {
    return <div>HOME FOOL</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);
