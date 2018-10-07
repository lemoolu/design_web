import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';
import { message } from 'antd';
import Router from 'next/router';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        phone: '',
        password: '',
        visit_code: '',
        msg_code: ''
      }
    };
  }

  componentDidMount() {
    this.props.actions.setTitle('注册');
  }

  onFormItemChange = (value, key) => {
    let formData = this.state.formData;
    _.set(formData, key, value);
    this.setState({ formData });
  }

  onSubmit = () => {
    console.log(this.state.formData);
    api.authSignup(this.state.formData).then(res => {
      if (res.status === 'success') {
        message.success('注册成功');
        Router.push({
          pathname: '/login',
        });
      } else {
        message.error(res.message);
      }
    })
  }

  render() {
    let formData = this.state.formData;

    return (
      <React.Fragment>
        <div className="login">
          <div className="login__title">“用设计解决这个世界上的小问题”</div>
          <div className="login__sub-title">欢迎</div>
          <div className="login__form">
            <Input value={formData.name} onChange={e => this.onFormItemChange(e.target.value, 'name')} placeholder="昵称"/>
            <Input value={formData.phone} onChange={e => this.onFormItemChange(e.target.value, 'phone')} placeholder="手机号"/>
            <Input value={formData.password} onChange={e => this.onFormItemChange(e.target.value, 'password')} type="password" placeholder="密码"/>
            <Input value={formData.visit_code} onChange={e => this.onFormItemChange(e.target.value, 'visit_code')} placeholder="邀请码"/>
            <Input value={formData.msg_code} onChange={e => this.onFormItemChange(e.target.value, 'msg_code')} placeholder="短信验证码" 
              addonAfter={<Button >发送验证码</Button>}/>
            <Button style={{margin: '120px auto'}} size="large" type="primary" onClick={this.onSubmit}>注册</Button>
          </div>
        </div> 
      </React.Fragment>
    )
  }
}

export default Page
