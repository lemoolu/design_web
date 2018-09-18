import React from 'react';
import Head from 'next/head';
import api from 'app/api';
import Link from 'next/link';


async function getLoginData() {
  return api.authInfo();
}

class Header extends React.Component {

  componentDidMount() {

  }

  static defaultProps = {
    title: null
  }

  render() {
    let title = '设计思维';
    if (this.props.title) {
      title = this.props.title + ' - ' + title;
    }

    return (
      <React.Fragment>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        </Head>
        <div className="header">
          <div className="header__container">
            <div className="header__logo">
              <Link href="/"><img src="/static/logo.png" alt="" height="25"/></Link>
            </div>
            <ul className="header__menu">
              <li className="sel">问题</li>
              <li>故事</li>
            </ul>
            <div className="header__login">
              
              <Link href="/about"><a>发布问题</a></Link>
              <Link href="/login"><a>登陆</a></Link>
              
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}



export default Header;
