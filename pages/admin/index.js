import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';
import schema from 'async-validator';
import { withRouter } from 'next/router';
import Link from 'next/link';


const descriptor = {
  phone: [
    { type: "string", required: true, message: '请填写账户' },
  ],
  password: [
    { type: "string", required: true, message: '请填写密码' },
  ]
}


const validator = new schema(descriptor);

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        phone: '18768177573',
        password: '123456',
      },
      errorMsg: null,
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('管理平台');
  }

  onFormItemChange = (value, key) => {
    let formData = this.state.formData;
    _.set(formData, key, value);
    this.setState({ formData });
    this.setState({ errorMsg: null });
  }

  onLoginSuccess = () => {
    // this.props.router.push('/');
    // location.reload();
    location.href = '/admin/problem'
  }

  onSubmit = () => {
    validator.validate(this.state.formData, (errors, fields) => {
      if (errors) {
        this.setState({ errorMsg: _.get(errors, '[0].message') });
      } else {
        api.adminLogin(this.state.formData).then(res => {
          if (res.status !== 'success') {
            this.setState({ errorMsg: res.message });
          } else {
            this.onLoginSuccess();
          }
        });
      }
    });
  }

  render() {
    let formData = this.state.formData;
    return (
      <div className="login">
        <div className="login__title">“用设计解决这个世界上的小问题”</div>
        <div className="login__sub-title">管理员登录</div>
        <div className="login__form">
          <Input value={formData.phone} onChange={e => this.onFormItemChange(e.target.value, 'phone')} placeholder="手机号"/>
          <Input value={formData.password} onChange={e => this.onFormItemChange(e.target.value, 'password')} type="password" placeholder="密码"/>
          <div className="login__form-err-msg">{this.state.errorMsg}</div>
          <Button className="login__form-btn" size="large" type="primary" onClick={this.onSubmit}>登录</Button>
        </div>
      </div>
    )
  }
}

export default Page
