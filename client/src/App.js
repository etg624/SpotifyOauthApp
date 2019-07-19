import React, { Component } from 'react';
import qs from 'query-string';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { serverData: {} };
  }

  componentDidMount() {
    const parsed = qs.parse(window.location.search);
    const accessToken = parsed.access_token;
    if (!accessToken) return;

    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          user: {
            name: data.display_name
          }
        })
      );
  }

  render() {
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

export default App;
