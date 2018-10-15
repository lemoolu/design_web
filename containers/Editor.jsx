/**
 * 用户详情展示
 */

import React from 'react';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import { Popover, Avatar } from 'antd';


class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static defaultProps = {
    value: undefined,
    onChange: undefined,
  }

  componentWillReceiveProps(props) {
    console.log('>>>', props.value)
    if (props.value !== this.value) {
      this.value = props.value;
      this.editor.txt.html(props.value || '');
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.editor) {
        return;
      }
      const E = window.wangEditor;
      const editor = new E('#editor2');
      editor.customConfig.uploadImgServer = '/api/admin/upload';
      editor.customConfig.uploadImgParams = {
        from: 'editor'
      };
      editor.customConfig.uploadImgParamsWithUrl = true;
      // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
      editor.customConfig.onchange = html => {
        this.value = html;
        this.props.onChange && this.props.onChange(html);
      }
      editor.customConfig.menus = [
        'head',
        'bold',
        'italic',
        'list',
        'link',
        // 'underline',
        'image',
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]

      this.editor = editor;
      this.editor.create();
      this.editor.txt.html(this.props.value)
    }, 500)
  }

  render() {
    const data = this.props.data;
    return (
      <div style={{margin: '20px 0'}} id="editor2"></div>
    )
  }
}

export default UserCard;
