import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { UploadImg, needLogin } from 'app/components';
import api from 'app/api';
import { Input, Button, message, Icon } from 'antd';
import Router from 'next/router';
import qs from 'qs';

const TextArea = Input.TextArea;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: '',
        content: '',
        image: ''
      }
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('发布问题');
    const E = window.wangEditor;

    const editor = new E('#editor')
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      let formData = this.state.formData;
      formData.content = html;
      this.setState({ formData });
    }
    editor.customConfig.menus = [
      // 'head',
      // 'bold',
      // 'italic',
      // 'list',
      // 'link',
      // // 'underline',
      // 'image',
      // 'code', // 插入代码
      // 'undo', // 撤销
      // 'redo' // 重复
    ]
    // editor.create();
    this.editor = editor;


    this.setState({
      id: _.get(qs.parse(window.location.search.replace('?', '')), 'id')
    }, () => {
      this.editInit();
    })
  }

  editInit = () => {
    if (!this.state.id) {
      return;
    }
    console.log(this.state.id);
    api.problemDetail({ id: this.state.id }).then(res => {
      this.setState({ formData: res.data });
    });
  }


  handleChange = (key, value) => {
    let formData = this.state.formData;
    formData[key] = value;
    this.setState({ formData });
  };


  onSubmit = () => {
    const formData = this.state.formData
    if (formData.title === '') {
      message.warn('请填写问题标题');
      return;
    }
    if (formData.title.length > 24) {
      message.warn('问题标题不能超多24个字符');
      return;
    }
    if (formData.content === '') {
      message.warn('请填写问题内容');
      return;
    }
    console.log(formData);
    let action = api.problemAdd;
    if (this.state.id) {
      action = api.problemUpdate;
    }
    action(formData).then(res => {
      if (res.status === 'success') {
        message.success('发布问题成功');
        setTimeout(() => {
          Router.push({
            pathname: '/my',
          })
        }, 2000);
      } else {
        message.error(res.message);
      }
    });
  }

  render() {
    const image = _.get(this.state, 'formData.image');

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="problem-add">
        <h1>{this.state.id ? '编辑问题' : '发布问题'}</h1>
        <Input 
          placeholder="填写你认为需要被解决的问题标题" 
          style={{marginTop: 20}} 
          value={this.state.formData.title} 
          onChange={e => this.handleChange('title', e.target.value)}
        >
        </Input>

        <div style={{textAlign: 'left', marginBottom: 20}} id="editor"></div>
        <TextArea 
          style={{marginBottom: 20}} 
          rows={8}
          value={this.state.formData.content} 
          onChange={e => this.handleChange('content', e.target.value)}
        ></TextArea>
        <UploadImg
          onChange={url => this.handleChange('image', url)}
        >
          {image ? <img src={image} alt="avatar" style={{maxWidth: 400}}/> : uploadButton}
        </UploadImg>
        <Button style={{marginTop: '20px', minWidth: 80}} onClick={this.onSubmit} size="large">发布</Button>
      </div>
    )
  }
}

export default needLogin(Page);
