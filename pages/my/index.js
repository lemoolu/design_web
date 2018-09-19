import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemType: 'join', // join or star
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('个人中心');
  }

  onProblemTypeChange = (type) => {
    this.setState({ problemType: type })
  }

  render() {
    return (
      <React.Fragment>
        <div className="my">
          <div className="my_background">
            <div className="my_background-avator">
              <img src="/static/logo.png" alt=""/>
            </div>
            <span className="my_background-name">想要飞翔的南瓜</span>
            <span className="my_background-exp">超能力 10</span>
            <a className="my_background-code">我的邀请码</a>
          </div>
          <div className="my_desc">
            <h3>平面设计师</h3>
            <p>About Me，Whenever you need to buy something that will go with whatever you are wearing that day, you may need to think about getting some designer watches. A watch is a piece of jewelry that you can wear every day, and it pretty much, will go with anything you are wearing. It’s not always going to make you look dressed up, but it may help you look more stylish, and sometimes that is all you want. Watches are the perfect answer to what you can wear with anything, because we are living in a world that always has to go through what time it is. There are a lot of different designer watches in the stoes. Some cost a lot than others. Though, you do not have to have a too costly watch to make yourself look good. Sometimes just owning a standard, everyday watch is another way to get the look you are going for.</p>
          </div>

          <div className="my_problems">
            <ul className="my_problems-tab">
              <li className={this.state.problemType === 'join' && 'sel'} onClick={() => this.onProblemTypeChange('join')}>参与的问题</li>
              <li className={this.state.problemType === 'star' && 'sel'} onClick={() => this.onProblemTypeChange('star')}>关注的问题</li>
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
