/**
 * 问题详情
 */

import React from 'react';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import UserBar from './UserBar.jsx';


class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null, // 当前菜单选中页面
    };
  }

  componentDidMount() {}

  static defaultProps = {}

  render() {
    return (
      <div className="ctn-problem">
        <div className="ctn-problem__head">
          <span className="ctn-problem__rate">进度：头脑风暴</span>
          <span className="ctn-problem__create-time">2018.06.18</span>
        </div>
        <h1 className="ctn-problem__title">高铁站进站闸门先前进再拔票会闯禁，严重降低效率。</h1>
        <p className="ctn-problem__main">
          高铁站在人流特别多的时候，进展效率经常受到闯禁影响，后续的人情绪在有限时间内很影响，效率也不高…
        </p>
        <UserBar>
          <div className="ctn-problem__user-star">收藏数：203</div>
        </UserBar>
      </div>
    )
  }
}

export default Problem;
