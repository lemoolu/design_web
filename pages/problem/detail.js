import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Router from 'next/router';
import { Header, UserBar, SolutionCard } from 'app/containers';
import { needLogin } from 'app/components';
import { Input, Button, message } from 'antd';
import api from 'app/api';
import qs from 'qs';
import SolutionAdd from './_SolutionAdd.jsx';


const TextArea = Input.TextArea;

class Page extends React.Component {
  constructor(props) {
    super(props);
    // console.log(Router.query.id)
    this.state = {
      problemId: props.id,
      problemData: {},
      addSolutionContent: '',
      solutionListPage: 1,
      solutionList: [],
      addSolution: false,
      hasSolution: undefined, // 是否有解决方案
      hasSolutionMore: true, // 是否还有解决方案
      commentList: [], // 评论列表 {solutionId, page, list} 
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('问题添加');
    this.setState({
      problemId: _.get(qs.parse(window.location.search.replace('?', '')), 'id')
    }, () => {
      this.getProblemDetail();
      this.getSolutionList();
    })
  }


  getProblemDetail = () => {
    api.problemDetail({ id: this.state.problemId }).then(res => {
      this.setState({ problemData: res.data });
    });
  }

  // 关注问题
  onProblemStar = () => {

  }

  getSolutionList = () => {
    api.solutionList({ problem_id: this.state.problemId, page: this.state.solutionListPage, pageSize: 5 }).then(res => {
      let solutionList = this.state.solutionList;
      solutionList = solutionList.concat(res.data.list);
      this.setState({
        solutionList,
        solutionListPage: this.state.solutionListPage + 1,
        hasSolution: !(solutionList.length === 0),
        hasSolutionMore: !(solutionList.length === res.data.total)
      });
    });
  }

  // 解决方案投票
  onSolutionVote = () => {

  }

  // 获取解决方案评论列表
  getSolutionCommentList = () => {

  }

  onShowAddSolution = (data = {}) => {
    if (!this.props.userData) {
      Router.push({
        pathname: '/login',
      });
      return;
    }
    this.setState({ addSolution: true, solutionData: data });
  }

  onHideAddSolution = () => {
    this.setState({ addSolution: false });
  }

  onAddSolutionSuccess = () => {
    console.log('---')
    api.solutionList({ problem_id: this.state.problemId, page: 1, pageSize: 5 }).then(res => {
      let solutionList = res.data.list;
      solutionList = solutionList.concat(this.state.solutionList);
      solutionList = _.unionBy(solutionList, 'id');
      this.setState({
        solutionList,
      });
    });
    this.setState({
      addSolution: false,
    });
  }

  onStarProblem = () => {
    if (!this.props.userData) {
      Router.push({
        pathname: '/login',
      });
      return;
    }
    api.problemStar({ problem_id: this.state.problemId }).then(res => {
      if (res.status === 'success') {
        message.success('关注成功');
        this.getProblemDetail();
      } else {
        message.error(res.message)
      }
    });
  }

  render() {
    const problemData = this.state.problemData || {};

    return (
      <div className="problem-detail">
        <div className="problem-detail__content">
          <h1>{problemData.title}</h1>
          <div className="problem-detail__main">
            {problemData.content}
          </div>
          <div className="problem-detail__main-img">
            <img src={problemData.image} alt=""/>
          </div>
        </div>
        <div className="problem-detail__creater">
          <UserBar data={problemData.user_data}>
            <div className="problem-detail__tool">
              <span>发布于 {problemData.created_at}</span>
              <span>{problemData.visit_count}次浏览</span>
              <span>{problemData.star_count}个持续关注</span>
              <a className="link-primary" onClick={this.onStarProblem}>关注</a>
              <a className="link-primary" onClick={this.onShowAddSolution}>写解决方案</a>
            </div>
          </UserBar>
        </div>

        <div className="problem-solution">
          {this.state.solutionList.map( x => 
            <SolutionCard
              data={x} 
              key={x.id} 
              userData={this.props.userData} 
              onEdit={this.onShowAddSolution}
            />
          )}

          <div className="problem-detail__footer">
            {this.state.hasSolution === false && 
              <span className="no-more">还没有解决方案，需要你的超能力~</span>
            }
            {this.state.hasSolution === true && 
              <React.Fragment>
                {this.state.hasSolutionMore && 
                  <a className="link-primary" onClick={this.getSolutionList}>查看更多解决方案</a>
                }      
                {!this.state.hasSolutionMore && 
                  <span className="no-more">- 没有更多解决方案了 -</span>
                } 
              </React.Fragment>
            }
            <br />
            <Button onClick={this.onShowAddSolution} type="primary" size="large">写我的解决方案</Button>
          </div>

        </div>

        {this.state.addSolution === true && 
          <SolutionAdd 
            data={this.state.solutionData}
            problemId={this.state.problemId}
            onCancel={this.onHideAddSolution} 
            onSuccess={this.onAddSolutionSuccess}
          />
        }
      </div>
    )
  }
}

export default Page
