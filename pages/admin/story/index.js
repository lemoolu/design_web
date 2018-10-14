import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { AdminLayout } from 'app/containers';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import { TableEx, UploadImg } from 'app/components';
import { Button, Modal, Row, Col, Input, Divider, Card, Avatar, Tooltip, Tag, Select, Icon, message } from 'antd';

const TextArea = Input.TextArea;
const Option = Select.Option;
const { Meta } = Card;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      visible: false,
      addData: {},
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
    console.log('============')
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

  onShowModal = (data = {}) => {
    this.setState({ visible: true, addData: data });
  }

  onHideModal = () => {
    this.setState({ visible: false, addData: {} });
  }

  handleChange = (key, v) => {
    let addData = this.state.addData;
    addData[key] = v;
    this.setState({ addData });
  }

  onDelete = (data) => {
    Modal.confirm({
      title: '提示',
      content: '确定删除该故事吗？',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        api.adminStoryDel(data).then(res => {
          message.success('故事删除成功');
          this.getTableList();
        });
      },
    });
  }

  onAddSubmit = () => {
    console.log(this.state.addData);
    if (!this.state.addData.id) {
      api.adminStoryAdd(this.state.addData).then(res => {
        message.success('故事添加成功');
        this.onHideModal();
        this.getTableList();
      });
    } else {
      api.adminStoryUpdate(this.state.addData).then(res => {
        message.success('故事编辑成功');
        this.onHideModal();
        this.getTableList();
      });
    }
  }

  render() {
    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: '名称', dataIndex: 'title' },
      { title: '发布人', dataIndex: 'user_data.name' },
      { title: '发布时间', dataIndex: 'created_at' },
      {
        title: '操作',
        dataIndex: '',
        width: 200,
        render: (status, record) => {
          return <span>
            <Button onClick={() => this.onShowModal(record)}>编辑</Button>&nbsp;
            <Button onClick={() => this.onDelete(record)} type="danger">删除</Button>
          </span>;
        }
      },
    ];

    const verifyData = this.state.verifyData;
    const image = _.get(this.state, 'addData.image');
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <AdminLayout {...this.props}>
        <h2>故事列表</h2>
        <div style={{padding: '10px 0'}}>
          <Select 
            placeholder="审核状态" 
            style={{width: 100}} 
            value={_.get(this.state.params, 'status')} 
            onChange={v => this.onParamsChange('status', v)}>
            <Option value="true">通过</Option>
            <Option value="false">不通过</Option>
            <Option value="null">待审核</Option>
          </Select>
          &nbsp;
          <Input 
            placeholder="搜索标题" 
            style={{width: 160}}
            value={this.state.params.search} 
            onChange={e => this.onParamsChange('search', e.target.value)}
          />
          &nbsp;
          <Button onClick={this.onFilterGet}>查询</Button>&nbsp;
          <Button onClick={() => this.onShowModal()} type="primary" >添加</Button>
        </div>
        <TableEx 
          api={api.adminStoryList}
          history={this.state.history}
          columns={columns}
          currentPage={this.state.pageNum}
          onCurrentPageChange={n => this.setState({pageNum: n})}
        />

        <Modal title="添加故事"
          visible={this.state.visible} 
          width={600} 
          onCancel={this.onHideModal}
          onOk={this.onAddSubmit}
        >
          <Row gutter={16}>
            <Input 
              placeholder="故事标题" 
              style={{marginTop: 20}} 
              value={this.state.addData.title} 
              onChange={e => this.handleChange('title', e.target.value)}
            >
            </Input>

            <div style={{textAlign: 'left', marginBottom: 20}} id="editor"></div>
            <TextArea style={{marginBottom: 20}} 
              placeholder="故事内容"
              value={this.state.addData.content} 
              onChange={e => this.handleChange('content', e.target.value)}
            ></TextArea>
            <UploadImg
              onChange={url => this.handleChange('image', url)}
              action="/api/admin/upload"
            >
              {image ? <img src={image} alt="avatar" style={{maxWidth: 400}}/> : uploadButton}
            </UploadImg>
          </Row>
        </Modal>
      </AdminLayout>
    )
  }
}

export default Page