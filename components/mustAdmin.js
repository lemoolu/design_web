import React from 'react';
import Router from 'next/router';


function mustAdmin(Node) {
  return function(props) {
    if (!props.userData || props.userData.is_admin !== true) {
      Router.push({ pathname: '/admin', });
    }
    return <Node {...props}></Node>
  }
}

export default mustAdmin;
