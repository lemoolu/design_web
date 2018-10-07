import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import api from 'app/api';
import UserBar from './UserBar.jsx';
import CommentCard from './CommentCard.jsx';
import { Input, Button, message } from 'antd';

const TextArea = Input.TextArea;


class Solution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      showAll: false,
      commentList: [],
      addCommentValue: '',
      addComment: false,
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }


  onVote = () => {
    api.solutionVote({
      solution_id: this.props.data.id
    }).then(res => {
      if (res.status === 'success') {
        message.success('投票成功');
        let data = this.state.data;
        data.vote_count += 1;
        this.setState({ data })
      } else {
        message.error(res.message);
      }
    });
  }

  onShowAll = () => {
    this.setState({ showAll: true });
    this.onGetComments();
  }


  onGetComments = () => {
    api.commentList({ solution_id: this.props.data.id, pageSize: 999999 }).then(res => {
      this.setState({ commentList: res.data.list });
    });
  }

  onShowAdd = () => {
    this.setState({ addComment: true });
  }

  onAddCommentChange = (e) => {
    this.setState({ addCommentValue: e.target.value })
  }

  onAddCommentSubmit = () => {
    api.commentAdd({ solution_id: this.props.data.id, content: this.state.addCommentValue }).then(res => {
      message.success('评论添加成功');
      this.setState({ addComment: false });
      this.onGetComments();
    });
  }

  render() {
    const data = this.props.data || {};
    let classNames = ['problem-solution__item'];
    if (this.state.showAll) {
      classNames.push('problem-solution__item-all')
    }
    return (
      <div className={classNames.join(' ')}>
        <UserBar data={data.user_data}> {data.created_at}</UserBar>
        <div className="problem-solution__item-main">
          {data.content}
        发斯蒂芬斯蒂芬斯蒂芬斯蒂芬是否对方水电费地方第三方第三方士大夫是否发士大夫撒发顺丰撒发顺丰沙发沙发沙发沙发沙发沙发发
        发斯蒂芬斯蒂芬斯蒂芬斯蒂芬是否对方水电费地方第三方第三方士大夫是否发士大夫撒发顺丰撒发顺丰沙发沙发沙发沙发沙发沙发发
        发斯蒂芬斯蒂芬斯蒂芬斯蒂芬是否对方水电费地方第三方第三方士大夫是否发士大夫撒发顺丰撒发顺丰沙发沙发沙发沙发沙发沙发发
        发斯蒂芬斯蒂芬斯蒂芬斯蒂芬是否对方水电费地方第三方第三方士大夫是否发士大夫撒发顺丰撒发顺丰沙发沙发沙发沙发沙发沙发发
        </div>
        <div className="problem-solution__item-more"><a onClick={this.onShowAll}>展开阅读全文</a></div>

        {this.state.showAll && 
          this.state.commentList.map(x => 
            <CommentCard data={x} key={x.id} />
          )
        }
        {this.state.showAll && this.state.commentList.length === 0 && 
          <div className="problem-solution__item-no-comment">- 没有评论 -</div>
        }
        {this.state.addComment === true && 
          <div>
            <TextArea placeholder="添加评论" value={this.state.addCommentValue} onChange={this.onAddCommentChange}></TextArea><br/>
            <Button onClick={this.onAddCommentSubmit}>提交</Button>
          </div>
        }
        
        <div className="problem-solution__item-bar">
          <a className="updata">上传原型图</a>
          <a className="discuss" onClick={this.onShowAdd}>讨论</a>
          <a className="vote" onClick={this.onVote}>投票({data.vote_count})</a>
        </div>
      </div>
    )
  }
}

export default Solution;
