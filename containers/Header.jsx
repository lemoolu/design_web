import React from 'react';
import Head from 'next/head';

class Header extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Head>
          <title>My page title</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        </Head>
        <div>
          header
        </div>
      </div>
    )
  }
}



export default Header;
