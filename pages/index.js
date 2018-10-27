import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header, ProblemCard, Banner } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';
import Router from 'next/router';
import { Row, Col } from 'antd';

function StoryCard({ index, data }) {
  return (
    <div className="home__storys-card">
      <div className="home__storys-card-index">0{index}</div>
      <div dangerouslySetInnerHTML={{__html: data.content}} />
    </div>
  )
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasMore: true,
      problemList: [],
      storyList: []
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('首页');
    this.getMoreProblem();
    this.getStoryList();
  }

  getMoreProblem = () => {
    api.problemList({ page: this.state.page, pageSize: 5 }).then(res => {
      let problemList = this.state.problemList;
      problemList = problemList.concat(res.data.list);

      this.setState({
        problemList,
        page: this.state.page + 1,
        hasMore: !(res.data.total === problemList.length),
      });
    });
  }

  getStoryList = () => {
    api.storyList().then(res => {
      this.setState({ storyList: res.data.list })
    });
  }


  render() {
    return (
      <React.Fragment>
        <Banner />
        <div className="home__content">
          <h1 className="title">“用设计解决这个世界上的小问题”</h1>
            
          <Row gutter={32}>
            <Col span={16}>
              <h2 className="subtitle">问题/Problem</h2>
              {this.state.problemList.map( x => 
                <ProblemCard data={x} key={x.id}/>
              )}
              
              {this.state.hasMore && 
                <div className="block-center">
                  <a className="link-primary" onClick={this.getMoreProblem}>查看更多</a> 
                </div>
              }
              {!this.state.hasMore && 
                <span className="no-more">- 没有更多了 -</span>  
              }
            </Col>

            <Col span="8">
              <h2 className="subtitle">故事/Story</h2>
              {this.state.storyList.map((x, index) => 
                <StoryCard data={x} index={index+1} key={index}/>
              )}
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}

export default Page
