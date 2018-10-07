import React from 'react';
import Router from 'next/router';


function needLogin(Node) {
  return function(props) {
    console.log(props)
    if (!props.userData) {
      Router.push({ pathname: '/login', });
      return '跳转到登录页面';
    }
    return <Node {...props}></Node>
  }
}

export default needLogin;
