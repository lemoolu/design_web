import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';
import './style.less';


class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  render() {
    return (
      <div className="banner">
        <h1>这里可以干什么？</h1>
        <p>成为发现者，把生活中“一瞬间”感觉不合理的小问题发布上来；成为解决者，用自己的能力与“独立青年”们协作，推动设计可视化，执行落地。我们希望，聚集更多“独立青年”的力量，一起用设计解决这个世界上的小问题。</p>
        <a>试试看</a>
      </div>
    )
  }
}

export default Banner;
