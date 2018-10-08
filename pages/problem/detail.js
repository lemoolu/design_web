import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Router from 'next/router';
import { Header, UserBar, Solution } from 'app/containers';
import { needLogin } from 'app/components';
import { Input, Button, message } from 'antd';
import api from 'app/api';
import qs from 'qs';


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
      hasSolution: true, // 是否有解决方案
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

  onShowAddSolution = () => {
    console.log(this.props)
    if (!this.props.userData) {
      Router.push({
        pathname: '/login',
        // query: { id }
      });
      return;
    }
    this.setState({ addSolution: true });
  }

  onHideAddSolution = () => {
    this.setState({ addSolution: false });
  }

  onAddSolutionContentChange = (e) => {
    this.setState({ addSolutionContent: e.target.value })
  }

  onAddSolutionSubmit = () => {
    api.solutionAdd({ content: this.state.addSolutionContent, problem_id: this.state.problemId }).then(res => {
      message.success('解决方案添加成功');
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
        addSolutionContent: ''
      });
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
      <React.Fragment>
        <div className="problem-detail">
          <div className="problem-detail__rate">进度：头脑风暴</div>
          <h1 className="problem-detail__title">{problemData.title}</h1>
          <div className="problem-detail__main">
            {problemData.content}
          </div>
          <div className="problem-detail__main-img">
            <img src={problemData.image} alt=""/>
          </div>
          <UserBar data={problemData.user_data}>
            <div className="problem-detail__user">
              <span>发布于 {problemData.created_at}</span>
              <span>{problemData.visit_count}次浏览</span>
              <span>{problemData.star_count}个持续关注</span>
              <a onClick={this.onShowAddSolution}>写解决方案</a>&nbsp;
              <a onClick={this.onStarProblem}>关注</a>
            </div>
          </UserBar>
        </div>

        <div className="problem-solution">

          {this.state.addSolution === true && 
            <div>
              <TextArea placeholder="填写我的解决方案" value={this.state.addSolutionContent} onChange={this.onAddSolutionContentChange}></TextArea><br/>
              <Button onClick={this.onAddSolutionSubmit}>提交</Button>
            </div>
          }

          {this.state.solutionList.map( x => 
            <Solution data={x} key={x.id}></Solution>
          )}

          {this.state.hasSolution === false && this.state.addSolution === false && 
            <div className="problem-solutio__not-have">
              还没有解决方案，需要你的超能力<br/>
              <Button onClick={this.onShowAddSolution}>写我的解决方案</Button>
            </div>
          }
          
          {this.state.hasSolution === true && 
            <div>
              {this.state.hasSolutionMore && 
                <Button onClick={this.getSolutionList}>查看更多解决方案</Button>
              }      
              {!this.state.hasSolutionMore && 
                <Button >没有更多解决方案了</Button>
              } 
            </div>
          }
        </div>
      </React.Fragment>
    )
  }
}

export default Page
