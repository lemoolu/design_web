import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { Button } from 'app/components';
import api from 'app/api';
import Link from 'next/link';
import Router from 'next/router';
import { Input, Row, Col, Form, Icon, Upload, message } from 'antd';

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
    this.state = {};
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  componentDidMount() {
    this.props.actions.setTitle('编辑个人信息');
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
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

    const imageUrl = this.state.imageUrl;

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
            <TextArea  placeholder="描述"></TextArea>
          </FormItem>
          <FormItem {...formItemLayout}  label="职位">
            <Input placeholder="职位"></Input>
          </FormItem>
          <FormItem {...formItemLayout}  label="头像">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/upload"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
          </FormItem>
          <form action="/api/upload" method="post" enctype="multipart/form-data">
              <input type="file" name="upload" multiple="multiple"/>
              <br />
              <button type="submit">Upload</button>
          </form>
        </div>

      </React.Fragment>
    )
  }
}

export default Page
