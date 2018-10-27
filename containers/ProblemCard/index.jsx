/**
 * 问题详情
 */

import React from 'react';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import UserBar from '../UserBar.jsx';
import moment from 'moment';
import './style.less';


class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  static defaultProps = {}

  onLinkDetail = () => {
    // Router.push({
    //   pathname: '/problem/detail',
    //   query: { id: this.props.data.id }
    // });
    window.open(`/problem/detail?id=${this.props.data.id}`);
  }

  render() {
    const data = this.props.data;
    return (
      <div className="problem-card" onClick={this.onLinkDetail}>
        <span className="time">{data.created_at}</span>
        <h1 className="problem-title">{data.title}</h1>
        <div className="content">
          {data.content}
        </div>
        <UserBar data={data.user_data}>
          <div className="problem-star">关注数：{data.star_count}</div>
        </UserBar>
        <div className="img">
          <img src={data.image} alt=""/>
        </div>
      </div>
    )
  }
}

export default Problem;
