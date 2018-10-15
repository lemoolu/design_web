/**
 * 邀请码页面
 */
import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { AdminLayout, UserCard } from 'app/containers';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import { TableEx } from 'app/components';
import { Button, Modal, Row, Col, Input, Divider, Card, Avatar, Tooltip, Tag, Select, InputNumber, message } from 'antd';

const TextArea = Input.TextArea;
const Option = Select.Option;
const { Meta } = Card;

function copyTextToClipboard(text, successCallback, failCallback) {
  let textArea = document.createElement("textarea")
  textArea.style.width = '0';
  textArea.style.height = '0';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    if (document.execCommand('copy'))
      message.success('已拷贝')
    else
      failCallback && failCallback();
  } catch (err) {
    failCallback && failCallback();
  }
  document.body.removeChild(textArea)
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      visible: false,
      verifyData: {},
      params: {},
      pageNum: 1,
      genCount: '',
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('管理平台');
    this.getTableList();
  }


  getTableList = () => {
    console.log(this.state.params)
    this.setState({
      history: this.state.history.concat([this.state.params])
    });
  }

  onParamsChange = (key, v) => {
    const params = this.state.params;
    params[key] = v;
    this.setState({ params }, () => {})
  }

  onFilterGet = () => {
    this.setState({ pageNum: 1 }, () => {
      this.getTableList();
    })
  }

  onAdd = () => {
    this.setState({ visible: true });
  }

  onDel = (record) => {

  }

  onSubmit = () => {
    if (!this.state.genCount) {
      message.warning('请填写数量');
    }
    api.adminInvitecodeGen({ count: this.state.genCount }).then(res => {
      if (res.status !== 'success') {
        message.warning(res.message);
        return;
      }
      this.onCancel();
      this.getTableList();
      Modal.success({
        title: '邀请码创建成功',
        content: res.data.join(','),
      });
    });
  }

  onCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const columns = [
      { title: 'ID', dataIndex: 'id', render: t => <a onClick={() => copyTextToClipboard(t)}>{t}</a> },
      { title: '使用人', dataIndex: 'use_user', render: (data, record) => <UserCard data={data}/> },
      { title: '创建时间', dataIndex: 'created_at' },
      {
        title: '操作',
        dataIndex: 'status',
        width: 100,
        render: (status, record) => {
          return <Button onClick={() => this.onDel(record)}>删除</Button>;
        }
      },
    ];

    const verifyData = this.state.verifyData;
    return (
      <AdminLayout {...this.props}>
        <h2>邀请码列表</h2>
        <div style={{padding: '10px 0'}}>
          <Select 
            allowClear
            placeholder="使用状态" 
            style={{width: 100}} 
            value={_.get(this.state.params, 'is_used')} 
            onChange={v => this.onParamsChange('is_used', v)}>
            <Option value="true">已使用</Option>
            <Option value="false">未使用</Option>
          </Select>
          &nbsp;
          <Button onClick={this.onFilterGet}>查询</Button>
          &nbsp;
          <Button onClick={this.onAdd}>添加邀请码</Button>
        </div>
        <TableEx 
          api={api.adminInvitecodeList}
          history={this.state.history}
          columns={columns}
          currentPage={this.state.pageNum}
          onCurrentPageChange={n => this.setState({pageNum: n})}
        />

        <Modal 
          title="生成邀请码" 
          visible={this.state.visible} 
          onCancel={this.onCancel}
          onOk={this.onSubmit}
        >
          <Row gutter={16}>
            <Col span="16">
              <InputNumber placeholder="邀请码生成数量" 
                value={this.state.genCount} 
                onChange={v => this.setState({ genCount: v }) }
              />
            </Col>
          </Row>
        </Modal>
      </AdminLayout>
    )
  }
}

export default Page
