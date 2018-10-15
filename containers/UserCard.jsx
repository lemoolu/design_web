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

  componentDidMount() {}

  static defaultProps = {
    data: {},
  }

  render() {
    const data = this.props.data;
    return (
      <Popover 
        title="用户详情"
        content={
          <div>
            <div><Avatar src={data.avatar}/></div>
            <div>ID：{data.id}</div>
            <div>名称：{data.name}</div>
            <div>创建时间：{data.created_at}</div>
          </div>
        }
      >
        <a>{data.name}</a>
      </Popover>
    )
  }
}

export default UserCard;
