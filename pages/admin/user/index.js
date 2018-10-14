import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { AdminLayout } from 'app/containers';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import { TableEx } from 'app/components';
import { Button, Modal, Row, Col, Input, Divider, Card, Avatar, Tooltip, Tag, Select } from 'antd';

const TextArea = Input.TextArea;
const Option = Select.Option;
const { Meta } = Card;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      visible: false,
      detailData: {},
      params: {},
      pageNum: 1
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

  onShowDetail = (data) => {
    this.setState({ visible: true, detailData: data, verifyMsg: '' });
  }

  onHideDetail = () => {
    this.setState({ visible: false, detailData: {} });
  }

  render() {
    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: '名称', dataIndex: 'name' },
      { title: '头像', dataIndex: 'avatar', render: url => <Avatar src={url} /> },
      { title: '创建时间', dataIndex: 'created_at' },
      {
        title: '操作',
        dataIndex: 'status',
        width: 100,
        render: (status, record) => {
          return <span><Button onClick={() => this.onShowDetail(record)}>详情</Button></span>;
        }
      },
    ];

    const detailData = this.state.detailData;
    return (
      <AdminLayout {...this.props}>
        <h2>用户列表</h2>
        <div style={{padding: '10px 0'}}>
          <Input 
            placeholder="搜索名字" 
            style={{width: 160}}
            value={this.state.params.search} 
            onChange={e => this.onParamsChange('search', e.target.value)}
          />
          &nbsp;
          <Button onClick={this.onFilterGet}>查询</Button>
        </div>
        <TableEx 
          api={api.adminUserList}
          history={this.state.history}
          columns={columns}
          currentPage={this.state.pageNum}
          onCurrentPageChange={n => this.setState({pageNum: n})}
        />

        <Modal title="详情" footer={null} visible={this.state.visible} width={1000} onCancel={this.onHideDetail}>
          <Row gutter={16}>
            <Col span={8}>ID: {detailData.id}</Col>
            <Col span={8}>名称：{detailData.name}</Col>
            <Col span={8}>头像：<Avatar src={detailData.avatar} /></Col>
            <Col span={8}>手机号：{detailData.phone}</Col>


            <Col span={8}>工作：{detailData.job}</Col>
            <Col span={8}>介绍：{detailData.introduction}</Col>
            <Col span={8}>创建时间：{detailData.created_at}</Col>
            <Col span={8}>最后更新时间：{detailData.updated_at}</Col>
            <Col span={8}>最后登录时间：todo{detailData.last_sign_in_at}</Col>
          </Row>
        </Modal>
      </AdminLayout>
    )
  }
}

export default Page
