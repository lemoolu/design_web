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

  render() {
    let classNames = ['ctn-userbar'];
    if (this.props.className) {
      classNames.push(this.props.className);
    }

    return (
      <div className={classNames.join(' ')}>
        <div className="ctn-userbar__avator">
          <img src="" alt=""/>
        </div>
        <div className="ctn-userbar__name">Kenneth Walsh</div>
        <div className="ctn-userbar__other">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default UserBar;
