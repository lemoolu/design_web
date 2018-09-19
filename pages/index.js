import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header, ProblemCard, Banner } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';

function StoryCard() {
  return (
    <div className="home__storys-card">
      <div className="home__storys-card-index">01</div>
      孩子学校教了垃圾分类，但是孩子的爸爸妈妈总是不知道垃圾应该分类，也不重视，如何解决问题？
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
    this.props.actions.setTitle('首页');
  }

  render() {
    return (
      <React.Fragment>
        <Banner />
        <div className="home__content">
          <h1 className="home__content-title">“用设计解决这个世界上的小问题”</h1>
          <div className="home__problems">
            <h2 className="home__content-subtitle">问题/Problem</h2>
            <ProblemCard data={{}}/>
            <ProblemCard data={{}}/>
          </div>
          <div className="home__storys">
            <h2 className="home__content-subtitle">故事/Story</h2>
            <StoryCard></StoryCard>
            <StoryCard></StoryCard>
            <StoryCard></StoryCard>
            <StoryCard></StoryCard>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Page
