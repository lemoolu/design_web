import React from 'react';
import axios from 'axios';


class MyLink extends React.Component {
  componentDidMount() {
    axios.get('/api/auth/info')
  }

  render() {
    return (
      <div>
        hello1
      </div>
    )
  }
}

export default MyLink
