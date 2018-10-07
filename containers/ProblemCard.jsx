/**
 * 问题详情
 */

import React from 'react';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import UserBar from './UserBar.jsx';
import moment from 'moment';


class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  static defaultProps = {}

  onLinkDetail = () => {
    console.log(this.props.data.id);
    Router.push({
      pathname: '/problem/detail',
      query: { id: this.props.data.id }
    });
  }

  render() {
    const data = this.props.data;
    return (
      <div className="ctn-problem" onClick={this.onLinkDetail}>
        <div className="ctn-problem__head">
          <span className="ctn-problem__rate">进度：头脑风暴</span>
          <span className="ctn-problem__create-time">{data.created_at}</span>
        </div>
        <h1 className="ctn-problem__title">{data.title}</h1>
        <p className="ctn-problem__main">
          {data.content}
        </p>
        <UserBar data={data.user_data}>
          <div className="ctn-problem__user-star">关注数：{data.star_count}</div>
        </UserBar>
        <div className="ctn-problem__img">
          <img src={data.image} alt=""/>
        </div>
      </div>
    )
  }
}

export default Problem;
