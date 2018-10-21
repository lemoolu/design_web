import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { AdminLayout, UserCard } from 'app/containers';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import { TableEx } from 'app/components';
import { Button, Modal, Row, Col, Input, Divider, Card, Avatar, Tooltip, Tag, Select, List } from 'antd';


const TextArea = Input.TextArea;
const Option = Select.Option;
const { Meta } = Card;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      visible: false,
      verifyData: {},
      solutionList: [],
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
    console.log(this.state.params);
    this.setState({
      history: this.state.history.concat([this.state.params])
    });
  }

  getSolutionList = (id) => {
    api.adminSolutionList({ problem_id: id, pageSize: 9999 }).then(res => {
      this.setState({ solutionList: res.data.list })
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

  onShowVerify = (data) => {
    console.log(data);
    this.setState({ visible: true, verifyData: data, verifyMsg: '', solutionList: [] });
    this.getSolutionList(data.id);
  }

  onHideVerify = () => {
    this.setState({ visible: false, verifyData: {} });
  }

  onVerify = (id, status) => {
    console.log(id);
    console.log(status);
    console.log(this.state.verifyMsg);
    api.adminProblemVeify({
      problem_id: id,
      status: status,
      verify_msg: this.state.verifyMsg,
    }).then(() => {
      this.onHideVerify();
      this.getTableList();
    });
  }

  render() {
    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: '名称', dataIndex: 'title' },
      { title: '发布人', dataIndex: 'user_data', render: data => <UserCard data={data}/> },
      { title: '方案数', dataIndex: 'solution_count' },
      { title: '原型数', dataIndex: '' },
      { title: '收藏数', dataIndex: 'star_count' },
      { title: '浏览数', dataIndex: 'visit_count' },
      { title: '发布时间', dataIndex: 'created_at' },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        render: (status, record) => {
          if (status === false) {
            return <Tooltip placement="top" title={record.verify_msg}>
              <Tag color="red">拒绝</Tag>
            </Tooltip>;
          }
          if (status === true) {
            return <Tooltip placement="top" title={record.verify_msg}>
                <Tag color="green">通过</Tag>
              </Tooltip>;
          }
          return '未审核';
        }
      },
      {
        title: '操作',
        dataIndex: 'operate',
        width: 100,
        render: (status, record) => {
          return <span><Button onClick={() => this.onShowVerify(record)}>审核</Button></span>;
        }
      },
    ];

    const verifyData = this.state.verifyData;
    return (
      <AdminLayout {...this.props}>
        <h2>问题列表</h2>
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
          <Button onClick={this.onFilterGet}>查询</Button>
        </div>
        <TableEx 
          rowKey="id"
          api={api.adminProblemList}
          history={this.state.history}
          columns={columns}
          currentPage={this.state.pageNum}
          onCurrentPageChange={n => this.setState({pageNum: n})}
        />

        <Modal title="审核" footer={null} visible={this.state.visible} width={1000} onCancel={this.onHideVerify}>
          <Row gutter={16}>
            <Col span="16">
              <h3>{verifyData.title}</h3>
              <div>{verifyData.content}</div>
              <img src={verifyData.image} alt="" style={{maxWidth: 500}}/>
            </Col>
            <Col span={8}>
              <div>审核需要记录理由</div>
              <div>
                <TextArea value={this.state.verifyMsg} onChange={e => this.setState({verifyMsg: e.target.value})}></TextArea>
              </div>
              <div style={{padding: '10px 0'}}>
                <Button onClick={() => this.onVerify(verifyData.id, true)}>通过</Button>&nbsp;
                <Button type="danger" onClick={() => this.onVerify(verifyData.id, false)}>不通过</Button>
              </div>
            </Col>
          </Row>
          <List
            itemLayout="horizontal"
            dataSource={this.state.solutionList}
            renderItem={item => (
              <List.Item actions={[<Button size="small">允许</Button>]}>
                <List.Item.Meta
                  avatar={<Avatar src={_.get(item, 'user_data.avatar')} />}
                  title={<UserCard data={_.get(item, 'user_data')}/>}
                  description={
                    <div>
                      {item.content}
                      <div><a href="">查看评论</a></div>
                      <List
                        dataSource={[]}
                      >
                        <List.Item>
                          sdfdsf
                        </List.Item>
                      </List>

                    </div>
                  }
                />
              </List.Item>
            )}
          />

        </Modal>
      </AdminLayout>
    )
  }
}

export default Page
