import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';
import Router from 'next/router';
import Link from 'next/link';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemType: 'join', // join or star
      userData: {}
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('个人中心');

    api.authInfo().then(res => {
      if (res.status === 'success') {
        this.setState({ userData: res.data })
      } else {
        Router.push('/login');
      }
    });
  }

  onProblemTypeChange = (type) => {
    this.setState({ problemType: type })
  }

  render() {
    let userData = this.state.userData;
    return (
      <React.Fragment>
        <div className="my">
          <div className="my_background">
            <div className="my_background-avator">
              <img src={_.get(userData, 'avatar')} alt=""/>
            </div>
            <span className="my_background-name">{_.get(userData, 'name')}</span>
            <span className="my_background-exp">超能力 {_.get(userData, 'ability_value')}</span>
            <Link href="/my/edit"><a className="my_background-setting">设置</a></Link>
            <Link href="/my/code"><a className="my_background-code">我的邀请码</a></Link>
          </div>
          <div className="my_desc">
            <h3>{_.get(userData, 'job') || '（神秘设计师）'}</h3>
            <p>{_.get(userData, 'introduction') || '（没有任何介绍....）'}</p>
          </div>

          <div className="my_problems">
            <ul className="my_problems-tab">
              <li className={this.state.problemType === 'join' ? 'sel' : undefined} onClick={() => this.onProblemTypeChange('join')}>参与的问题</li>
              <li className={this.state.problemType === 'star' ? 'sel' : undefined} onClick={() => this.onProblemTypeChange('star')}>关注的问题</li>
            </ul>
            <ul className="my_problems-list">
              <li><a>聚会或一起时候，矿泉水瓶子总是分不清谁是谁的？</a></li>
              <li><a>聚会或一起时候，矿泉水瓶子总是分不清谁是谁的？</a></li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Page
