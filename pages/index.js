import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('首页');
  }

  render() {
    return (
      <React.Fragment>
        index
      </React.Fragment>
    )
  }
}

export default Page
