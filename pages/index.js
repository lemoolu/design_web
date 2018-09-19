import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header, ProblemCard, Banner } from 'app/containers';
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
        <Banner />
        <div className="home_content">
          <h1 className="home_content-title">“用设计解决这个世界上的小问题”</h1>
          <div className="home_problems">
            <h2 className="home_content-subtitle">问题/Problem</h2>
            <ProblemCard data={{}}/>
            <ProblemCard data={{}}/>
          </div>
          <div className="home_storys">
            <h2 className="home_content-subtitle">故事/Story</h2>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Page
