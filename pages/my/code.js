import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('我的邀请码');
  }

  render() {
    return (
      <React.Fragment>
        我的邀请码
      </React.Fragment>
    )
  }
}

export default Page
