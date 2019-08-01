import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import qs from 'query-string';
// import login from './actions';

import Login from './components/Login';
import Profile from './components/Profile';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/profile" component={Profile} />
      </div>
    );
  }
}

export default App;
