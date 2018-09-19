import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        phone: '',
        password: '',
      }
    };
  }

  componentDidMount() {
    this.props.actions.setTitle('登录');
  }

  onFormItemChange = (value, key) => {
    let formData = this.state.formData;
    _.set(formData, key, value);
    this.setState({ formData });
  }

  onSubmit = () => {
    console.log(this.state.formData);
  }

  render() {
    let formData = this.state.formData;

    return (
      <React.Fragment>
        <div className="login">
          <div className="login__title">“用设计解决这个世界上的小问题”</div>
          <div className="login__sub-title">欢迎</div>
          <div className="login__form">
            <Input value={formData.phone} onChange={e => this.onFormItemChange(e.target.value, 'phone')} placeholder="手机号"/>
            <Input value={formData.password} onChange={e => this.onFormItemChange(e.target.value, 'password')} type="password" placeholder="密码"/>
            <Button style={{margin: '120px auto'}} size="large" type="primary" onClick={this.onSubmit}>登录</Button>
          </div>
        </div> 
      </React.Fragment>
    )
  }
}

export default Page
