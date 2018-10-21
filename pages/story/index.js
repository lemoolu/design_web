import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header, UserBar } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';

function StoryCard({ data }) {
  return (
    <div className="story__card">
      <div className="story__card-img">
        {data.image && <img src={data.image} alt=""/>}
      </div>
      <h2>{data.title}</h2>
      <div className="story__card-content" dangerouslySetInnerHTML={{__html: data.content}} />
      <UserBar type="from" infos={['发布于' + data.created_at, data.visit_count + '次浏览']}>
      </UserBar>
    </div>
  )
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storyPrimay: {},
      storyList: [],
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('故事');
    this.getStoryList();
  }

  getStoryList = () => {
    api.storyList().then(res => {

      this.setState({ storyPrimay: res.data.list[0], storyList: res.data.list.splice(1) })
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="story">
          <div className="story__big">
            <h1>{this.state.storyPrimay.title}</h1>
            <div className="story__big-content" dangerouslySetInnerHTML={{__html: this.state.storyPrimay.content}}></div>
            <div className="story__big-img">
              <img src={this.state.storyPrimay.image} alt=""/>
            </div>
          </div>
          {this.state.storyList.map(x => 
            <StoryCard data={x} key={x.id}/>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default Page
