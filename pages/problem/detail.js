import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header, UserBar } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';

function Solution(){
  return(
    <li className="problem-solution__item">
      <UserBar></UserBar>
      <div className="problem-solution__item-main">1，它能帮助人们从源头从新定义问题，这决定了解决方案一定是革新的，而非改良的；</div>
      <div className="problem-solution__item-more"><a>展开阅读全文</a></div>
      <div className="problem-solution__item-bar">
        <a className="updata">上传原型图</a>
        <a className="discuss">讨论</a>
        <a className="vote">投票(1)</a>
        <a className="like">点赞</a>
      </div>
    </li> 
  )
}


class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('问题添加');
  }

  render() {
    return (
      <React.Fragment>
        <div className="problem-detail">
          <div className="problem-detail__rate">进度：头脑风暴</div>
          <h1 className="problem-detail__title">高铁站进站闸门先前进再拔票会闯禁，严重降低效率。</h1>
          <div className="problem-detail__main">
            高铁站在人流特别多的时候，进展效率经常受到闯禁影响，后续的人情绪在有限时间内很影响，效率也不高…
          </div>
          <UserBar>
            <div className="problem-detail__user">
              <span>发布于2018.10.21 </span>
              <span>12919次浏览</span>
              <span>203个持续关注</span>
              <a>写解决方案</a>
            </div>
          </UserBar>
        </div>

        <ul className="problem-solution">
          <Solution></Solution>
          <Solution></Solution>
        </ul>
      </React.Fragment>
    )
  }
}

export default Page
