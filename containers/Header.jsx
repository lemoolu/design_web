import React from 'react';
import Head from 'next/head';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null, // 当前菜单选中页面
    };
  }

  componentDidMount() {
    this.setMenuItemSel();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setMenuItemSel();
  }

  static defaultProps = {
    title: null,
    userData: null
  }

  setMenuItemSel() {
    let currentPage = null;
    if (Router.route === '/' || /problem/.test(Router.route)) {
      currentPage = 'problem';
    } else if (/story/.test(Router.route)) {
      currentPage = 'story';
    }
    if (currentPage !== this.state.currentPage) {
      this.setState({ currentPage })
    }
  }

  render() {
    let title = '设计思维';
    if (this.props.title) {
      title = this.props.title + ' - ' + title;
    }

    let userData = this.props.userData;

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
              <li className={this.state.currentPage === 'problem' ? 'sel' : undefined}><Link href="/"><a>问题</a></Link></li>
              <li  className={this.state.currentPage === 'story' ? 'sel' : undefined}><Link href="/story"><a>故事</a></Link></li>
            </ul>
            <div className="header__login">
              <Link href="/problem/add"><a>发布问题</a></Link>
              { userData && 
                <span>
                  <Link href="/my"><a>{userData.name}</a></Link>
                  <Link href="/api/log/out"><a>退出</a></Link>
                </span>
              }
              { !userData && 
                <Link href="/login"><a>登录</a></Link>
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}



export default Header;
