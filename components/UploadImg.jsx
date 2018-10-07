import React from 'react';
import { Upload, message } from 'antd';


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

class UploadImg extends React.Component {
  componentDidMount() {}

  static defaultProps = {
    name: 'avatar',
    listType: 'picture-card',
    className: 'avatar-uploader',
    showUploadList: false,
    action: '/api/upload',
    beforeUpload: this.beforeUpload,
    onChange: undefined,
  }

  handleChange = (info) => {

    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      console.log(info)
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          loading: false,
        });
        this.props.onChange && this.props.onChange(_.get(info, 'file.response.data.url'));
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    let classNames = [];
    if (this.props.className) {
      classNames.push(this.props.className);
    }

    return (
      <Upload
        name={this.props.name}
        listType={this.props.listType}
        className={this.props.className}
        showUploadList={this.props.showUploadList}
        action={this.props.action}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {this.props.children}
      </Upload>
    )
  }
}



export default UploadImg;
