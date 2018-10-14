import App, { Container } from 'next/app';
import React from 'react';
import 'app/styles/index.less';
import api from 'app/api';
import axios from 'axios';
import { Header } from 'app/containers';


export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      userData: null,
      actions: {
        setTitle: this.setTitle
      }
    };

    console.log(props.router.pathname);
  }

  // 设置标题
  setTitle = (title) => {
    this.setState({ title });
  }

  getUserData = () => {
    api.authInfo().then(res => {
      if (res.status === 'success') {
        this.setState({ userData: res.data })
      } else {
        this.setState({ userData: null })
      }
    });
  }

  componentDidMount() {
    this.getUserData();
  }

  // componentDidCatch() {

  // }

  render() {
    const { Component, pageProps, userData } = this.props
    return (
      <Container>
        {!/\/admin/.test(this.props.router.pathname) &&
          <Header title={this.state.title} userData={this.state.userData}/>
        }
        <div className="container">
          <Component {...pageProps} userData={this.state.userData} actions={this.state.actions} />
        </div>
      </Container>
    )
  }
}
