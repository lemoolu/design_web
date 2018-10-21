import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import { Modal, Input, Button, message, Icon } from 'antd';
import { UploadImg, needLogin } from 'app/components';

const TextArea = Input.TextArea;


class SolutionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  static defaultProps = {
    data: {},
    problemId: null,
  }

  componentWillReceiveProps(props) {
    this.setState({ data: props.data });
  }

  componentDidMount() {}

  onAddSolutionSubmit = () => {
    let action = api.solutionAdd;
    if(this.state.data.id){
      action = api.solutionEdit
    }
    action({
      id: this.state.data.id,
      content: this.state.data.content,
      image: this.state.data.image,
      problem_id: this.props.problemId
    }).then(res => {
      if (res.status !== 'success') {
        message.error(res.message);
        return;
      }
      message.success(this.state.data.id ? '解决方案编辑成功' : '解决方案添加成功');
      this.props.onSuccess && this.props.onSuccess();
    });
  }

  onChange = (key, value) => {
    let data = { ...this.state.data };
    data[key] = value
    this.setState({ data });
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const image = _.get(this.state, 'data.image');

    return (
      <React.Fragment>
        <Modal
          title={this.state.data.id ? '编辑解决方案' : '添加解决方案'}
          visible={true}
          width={1000}
          onCancel={this.props.onCancel}
          okText="提交"
          cancelText="取消"
          onOk={this.onAddSolutionSubmit}
        >
          <TextArea 
            placeholder="填写我的解决方案" 
            value={this.state.data.content} 
            onChange={e => this.onChange('content', e.target.value)}
            rows={6}
            style={{marginBottom: 10}}
          />
          <UploadImg
            onChange={url => this.onChange('image', url)}
          >
            {image ? <img src={image} alt="avatar" style={{maxWidth: 400}}/> : uploadButton}
          </UploadImg>
        </Modal>
      </React.Fragment>
    )
  }
}

export default SolutionAdd;
