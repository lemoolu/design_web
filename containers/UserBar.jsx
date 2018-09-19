import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Header } from 'app/containers';
import { Input, Button } from 'app/components';
import api from 'app/api';

class UserBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps({ Component, router, ctx }) {
    return {};
  }

  static defaultProps = {
    type: 'info', // info 默认模式，包含头像；from使用来自
    infos: [],
  }

  render() {
    let classNames = ['ctn-userbar'];
    if (this.props.className) {
      classNames.push(this.props.className);
    }

    return (
      <div className={classNames.join(' ')}>
        {this.props.type === 'info' && 
          <div className="ctn-userbar__avator">
            <img src="" alt=""/>
          </div>
        }

        <div className="ctn-userbar__name">{this.props.type === 'from' && <span>来自 </span>} Kenneth Walsh</div>
        <div className="ctn-userbar__other">
          {this.props.infos.map(x => 
            <span className="ctn-userbar__info">{x}</span>
          )}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default UserBar;
