import React from 'react';
import Router from 'next/router';
import Link from 'next/link';

function needLogin(Node) {
  return function(props) {
    console.log(props)
    if (!props.userData) {
      // Router.push({ pathname: '/login', });
      return <Link href="/login"><a class="link-primary">请先登录</a></Link>;
    }
    return <Node {...props}></Node>
  }
}

export default needLogin;
