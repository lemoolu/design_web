import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header, ProblemCard, Banner } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';
import Router from 'next/router';

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
    // this.onLinkDetail(101);
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

  onLinkDetail = (id) => {
    Router.push({
      pathname: '/problem/detail',
      query: { id }
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
          <h1 className="home__content-title">“用设计解决这个世界上的小问题”</h1>
          <div className="home__problems">
            <h2 className="home__content-subtitle">问题/Problem</h2>
            {this.state.problemList.map( x => 
              <ProblemCard data={x} key={x.id}/>
            )}
            
            {this.state.hasMore && 
              <a className="home__problems-more-btn" onClick={this.getMoreProblem}>查看更多</a>  
            }

            {!this.state.hasMore && 
              <div className="home__problems-no-more">- 没有更多了 -</div>  
            }

          </div>
          <div className="home__storys">
            <h2 className="home__content-subtitle">故事/Story</h2>
            {this.state.storyList.map((x, index) => 
              <StoryCard data={x} index={index+1}/>
            )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Page
