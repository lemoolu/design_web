/**
 * 评论详情
 */

import React from 'react';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import UserBar from '../UserBar.jsx';
import moment from 'moment';
import './style.less';


class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  static defaultProps = {}

  render() {
    const data = this.props.data;
    return (
      <div className="comment-card">
        <UserBar data={data.user_data}>
        </UserBar>
        <div className="comment-card__content">
          {data.content}
        </div>
      </div>
    )
  }
}

export default Comment;
