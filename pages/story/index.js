import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header, UserBar } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';

function StoryCard() {
  return (
    <div className="story__card">
      <div className="story__card-img"></div>
      <p>孩子学校教了垃圾分类，但是孩子的爸爸妈妈总是不知道垃圾应该分类，也不重视，如何解决问题？</p>
      <UserBar type="from" infos={['发布于2018.10.21', '12919次浏览']}>
      </UserBar>
    </div>
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
    this.props.actions.setTitle('故事');
  }

  render() {
    return (
      <React.Fragment>
        <div className="story">
          <div className="story__big">
            <h1>腾讯设计师在路边摊的 “暖心实践”</h1>
            <p>这家肠粉店，开了 8 年了，在去公司路上，为了吃早点，我必须提早一点到公司，虽然常见面，但我们的交谈也仅限于 “老板，来份双蛋的”。</p>
            <div className="story__big-img"></div>
          </div>

          <StoryCard></StoryCard>
          <StoryCard></StoryCard>
          <StoryCard></StoryCard>
        </div>
      </React.Fragment>
    )
  }
}

export default Page
