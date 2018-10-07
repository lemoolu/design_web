import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import { UploadImg } from 'app/components';
import { Input, Row, Col, Form, Icon, Upload, message, Button } from 'antd';


const { TextArea } = Input;
const FormItem = Form.Item;


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        introduction: '',
        job: '',
        avatar: '',
      },
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('编辑个人信息');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userData) {
      this.setState({ formData: nextProps.userData });
    }
  }

  handleChange = (key, value) => {
    console.log(value)
    let formData = this.state.formData;
    formData[key] = value;
    this.setState(formData);
  }

  onSubmit = () => {
    console.log(this.state.formData);
    api.authInfoUpdate(this.state.formData).then(res => {
      if (res.status === 'success') {
        message.success('信息修改成功');
        setTimeout(() => {
          Router.push({
            pathname: '/my',
          })
        }, 2000);
      } else {
        message.error(res.message);
      }
    });
  }


  render() {
    const formItemLayout = {
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 16
      },
    };

    const imageUrl = _.get(this.state, 'formData.avatar');

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <React.Fragment>
        <div className="my__edit">
          <h1 style={{marginBottom: 30}}>编辑个人信息</h1>
          <FormItem {...formItemLayout} label="描述">
            <TextArea  placeholder="描述" 
              value={this.state.formData.introduction} 
              onChange={e => this.handleChange('introduction', e.target.value)}
            >
            </TextArea>
          </FormItem>
          <FormItem {...formItemLayout}  label="职位">
            <Input placeholder="职位"
              value={this.state.formData.job} 
              onChange={e => this.handleChange('job', e.target.value)}
            ></Input>
          </FormItem>
          <FormItem {...formItemLayout}  label="头像">
            <UploadImg
              onChange={url => this.handleChange('avatar', url)}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" width="100"/> : uploadButton}
            </UploadImg>
          </FormItem>
          <FormItem wrapperCol={{offset: 2}}>
            <Button onClick={this.onSubmit}>保存</Button>
          </FormItem>
          
        </div>

      </React.Fragment>
    )
  }
}

export default Page
