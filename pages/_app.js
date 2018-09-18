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

    return { pageProps, userData: {} }
  }
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      userData: {},
      actions: {
        setTitle: this.setTitle
      }
    };
  }

  // 设置标题
  setTitle = (title) => {
    this.setState({ title });
  }


  componentDidMount() {
    api.authInfo().then(res => {
      console.log(res);
    });
  }

  // componentDidCatch() {

  // }

  render() {
    const { Component, pageProps, userData } = this.props
    return (
      <Container>
        <Header title={this.state.title}/>
        <div className="container">
          <Component {...pageProps} userData={userData} actions={this.state.actions} />
        </div>
      </Container>
    )
  }
}
