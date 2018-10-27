import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';
import Router from 'next/router';
import Link from 'next/link';
import { Tag } from 'antd';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemType: '', // join or star
      userData: {},
      problemList: {
        create: undefined,
        star: undefined,
        join: undefined
      }
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

    this.onProblemTypeChange('create');
  }

  // create star join
  onProblemTypeChange = (type) => {
    this.setState({ problemType: type });
    if (!this.state.problemList[type]) {
      console.log(type);
      api.authGetMyProblem({ type }).then(res => {
        this.state.problemList[type] = res.data;
        this.setState({ problemList: this.state.problemList })
      });
    }
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
            <Link href="/my/edit"><a className="my_background-setting link-primary">编辑</a></Link>
            {
              // <Link href="/my/code"><a className="my_background-code">我的邀请码</a></Link>
            }

          </div>
          <div className="my_desc">
            <h3>{_.get(userData, 'job') || '（神秘设计师）'}</h3>
            <p>{_.get(userData, 'introduction') || '（没有任何介绍....）'}</p>
          </div>

          <div className="my_problems">
            <ul className="my_problems-tab">
              <li className={this.state.problemType === 'create' ? 'sel' : undefined} onClick={() => this.onProblemTypeChange('create')}>创建的问题</li>
              <li className={this.state.problemType === 'join' ? 'sel' : undefined} onClick={() => this.onProblemTypeChange('join')}>参与的问题</li>
              <li className={this.state.problemType === 'star' ? 'sel' : undefined} onClick={() => this.onProblemTypeChange('star')}>关注的问题</li>
            </ul>
            <ul className="my_problems-list">
              { this.state.problemList[this.state.problemType] && this.state.problemList[this.state.problemType].map(item => 
                <li>
                  <Link href={{ pathname: '/problem/detail', query: { id: item.id } }}>
                    <a className="link-primary">{item.title} </a>
                  </Link>

                  {this.state.problemType === 'create' && 
                    <span className="status-bar">
                      {item.status === undefined && <Tag color="orange">审核中</Tag>}
                      {item.status === true && <Tag color="green">审核通过</Tag>}
                      {item.status === false && <Tag color="red">审核不通过</Tag>}

                      {(item.status === true || item.status === false ) && 
                        <Link href={{ pathname: '/problem/add', query: { id: item.id } }}>
                          <a className="link-primary">编辑</a>
                        </Link>
                      }
                    </span>
                  }
                </li>
              )}
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Page
