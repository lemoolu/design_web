import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import api from 'app/api';
import './admin.less';
import { TableEx } from 'app/components';

const { Header, Content, Footer } = Layout;

TableEx.defaultProps.onRequest = (params) => {
  // console.log('defaultProps.onRequest', params);
  return {
    page: params.current,
    data: params.data,
    ...params,
    // pageSize: 10,
  };
};

TableEx.defaultProps.onResponse = (res) => {
  // console.log('defaultProps.onResponse', res.data);
  let data = res.data;
  return {
    list: data.list,
    pageSize: data.pageSize,
    current: data.page,
    total: data.total,
  };
};

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    api.adminInfo().then(res => {
      if (res.status === 'success') {
        this.setState({ show: true, userData: res.data });
      } else {
        Router.push('/admin');
      }
    });
    console.log(window.location.pathname)
    // this.props.actions.setTitle('管理平台');
  }

  render() {
    if (!this.state.show) {
      return null
    }

    return (
      <Layout className="layout">
        <Header>
          <div className="logo">设计思维</div>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link href="/admin/problem"><a>问题</a></Link></Menu.Item>
            <Menu.Item key="2"><Link href="/admin/story"><a>故事</a></Link></Menu.Item>
            <Menu.Item key="3"><Link href="/admin/solution"><a>解决方案</a></Link></Menu.Item>
            <Menu.Item key="4"><Link href="/admin/comment"><a>评论</a></Link></Menu.Item>
            <Menu.Item key="5"><Link href="/admin/user"><a>用户</a></Link></Menu.Item>
          </Menu>
          <div className="user-info">{this.state.userData.name}</div>
        </Header>
        <Content style={{ padding: '50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
      </Layout>
    )
  }
}

export default Page