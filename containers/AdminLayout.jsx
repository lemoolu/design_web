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
    this.state = {
      routes: [
        { link: '/admin/problem', title: '问题' },
        { link: '/admin/story', title: '故事' },
        { link: '/admin/solution', title: '解决方案' },
        { link: '/admin/comment', title: '评论' },
        { link: '/admin/user', title: '用户' },
        { link: '/admin/invitecode', title: '邀请码' },
      ],
    };
  }

  componentDidMount() {
    api.adminInfo().then(res => {
      if (res.status === 'success') {
        this.setState({ show: true, userData: res.data });
      } else {
        Router.push('/admin');
      }
    });
    this.setState({ pathname: window.location.pathname });
    // this.props.actions.setTitle('管理平台');
  }

  render() {
    if (!this.state.show) {
      return null
    }

    return (
      <Layout className="layout">
        <Header>
          <div className="logo">设计思维管理平台</div>
          <div className="menu">
            {this.state.routes.map(x => 
              <Link href={x.link}><a className={x.link === this.state.pathname ? 'sel' : ''}>{x.title}</a></Link>
            )}
          </div>
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
