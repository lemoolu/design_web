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
    return {
      userData: null
    };
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
        message.error('请坚定你的立场哦~');
      }
    });
  }

  onShowAll = () => {
    this.setState({ showAll: true });
    this.onGetComments();
  }

  onGetComments = () => {
    if (this.state.commentList.length > 0) {
      return;
    }
    api.commentList({ solution_id: this.props.data.id, pageSize: 999999 }).then(res => {
      this.setState({ commentList: res.data.list });
    });
  }

  onShowAdd = () => {
    this.setState({ addComment: true });
  }
  onAddCommentCancel = () => {
    this.setState({ addComment: false });
  }
  onShowCommentList = () => {
    this.onGetComments();
    this.setState({ isShowComment: true })
  }
  onHideCommentList = () => {
    this.setState({ isShowComment: false })
  }
  onAddCommentChange = (e) => {
    this.setState({ addCommentValue: e.target.value })
  }
  onAddCommentSubmit = () => {
    api.commentAdd({ solution_id: this.props.data.id, content: this.state.addCommentValue }).then(res => {
      message.success('评论添加成功');
      this.setState({ addComment: false, addCommentValue: '' });
      this.onGetComments();
    });
  }

  onEditSolution = () => {
    this.props.onEdit && this.props.onEdit(this.props.data);
  }

  render() {
    const data = this.props.data || {};
    let content = data.content + '';
    let hasMore = true;
    let classNames = ['problem-solution__item'];
    if (this.state.showAll) {
      classNames.push('problem-solution__item-all')
    }
    if (!this.state.showAll && content.length > 210) {
      content = content.slice(0, 210) + '...';
    } else {
      hasMore = false;
    }

    return (
      <div className={classNames.join(' ')}>
        <UserBar data={data.user_data}>
          {data.created_at} 
          {_.get(this.props.userData, 'id') === data.user_id && 
            <a className="problem-solution__item-edit" onClick={this.onEditSolution}>编辑</a>}
        </UserBar>
        <div className="problem-solution__item-main">
          {content}
          <br/>
          {data.image && <img src={data.image} alt=""/>}
        </div>
        {hasMore && 
          <div className="problem-solution__item-more"><a onClick={this.onShowAll}>展开阅读全文</a></div>
        }

        <div className="problem-solution__item-bar">
          {!this.state.isShowComment && 
            <a className="discuss" onClick={this.onShowCommentList}>讨论({data.comment_count})</a>
          }
          {this.state.isShowComment && 
            <a className="discuss" onClick={this.onHideCommentList}>收起讨论</a>
          }
          
          <a className="vote" onClick={this.onVote}>投票({data.vote_count})</a>
        </div>

        {this.state.isShowComment && 
          <div>
            {this.props.userData && 
              <div style={{padding: '10px 50px'}}>
                <UserBar data={this.props.userData}><a onClick={this.onShowAdd}>我要评论</a></UserBar>
              </div>
            }
            {this.state.addComment === true && 
              <div>
                <TextArea 
                  placeholder="添加评论" 
                  value={this.state.addCommentValue} 
                  onChange={this.onAddCommentChange} 
                  style={{marginBottom: 4}}
                />
                <br/>
                <Button onClick={this.onAddCommentSubmit} type="primary">提交</Button>&nbsp;
                <Button onClick={this.onAddCommentCancel}>取消</Button>
              </div>
            }

            {this.state.commentList.map(x => 
              <CommentCard data={x} key={x.id} />
            )}
            {this.state.commentList.length === 0 && 
              <div className="problem-solution__item-no-comment">- 没有人评论 -</div>
            }
          </div>
        }

      </div>
    )
  }
}

export default Solution;
