import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import api from 'app/api';
import UserBar from '../UserBar.jsx';
import CommentCard from '../CommentCard';
import { Input, Button, message } from 'antd';
import './style.less';

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
        message.error(res.message);
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
    let classNames = ['solution-card'];
    if (this.state.showAll) {
      classNames.push('solution-card__show-all')
    }
    if (!this.state.showAll && content.length > 210) {
      content = content.slice(0, 210) + '...';
    } else {
      hasMore = false;
    }

    return (
      <div className={classNames.join(' ')}>
        <UserBar data={data.user_data}>
          {data.created_at} &nbsp;&nbsp;&nbsp;
          {_.get(this.props.userData, 'id') === data.user_id && 
            <a className="link-primary" onClick={this.onEditSolution}>编辑</a>}
        </UserBar>

        <div className="solution-card__content" dangerouslySetInnerHTML={{__html: content}}></div>

        {hasMore && 
          <div className="solution-card__btn-more"><a className="link-primary" onClick={this.onShowAll}>展开阅读全文</a></div>
        }

        <div className="solution-card__tool">
          {!this.state.isShowComment && 
            <a onClick={this.onShowCommentList}>讨论({data.comment_count})</a>
          }
          {this.state.isShowComment && 
            <a onClick={this.onHideCommentList}>收起讨论</a>
          }
          
          <a onClick={this.onVote}>投票({data.vote_count})</a>
        </div>

        {this.state.isShowComment && 
          <div>
            {this.props.userData && 
              <div className="solution-card__comment-add-btn">
                <UserBar data={this.props.userData}><a className="link-primary" onClick={this.onShowAdd}>我要评论</a></UserBar>
              </div>
            }
            {this.state.addComment === true && 
              <div className="solution-card__comment-add">
                <TextArea 
                  placeholder="添加评论" 
                  value={this.state.addCommentValue} 
                  onChange={this.onAddCommentChange} 
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
              <div className="solution-card__no-comment">
                <span className="no-more">- 没有人评论 -</span>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default Solution;