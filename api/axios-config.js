// import { message } from 'antd';
import { message } from 'app/components';

let requestCount = 0;
let isLinkToLogin = false;


// link to login
function toLogin(res) {
  if (!isLinkToLogin && window.location.pathname !== 'login') {
    isLinkToLogin = true;
    message.loading('即将跳转到登陆页面', 3);
    setTimeout(() => {
      // window.location = res.data.redirect;
    }, 3000);
  }
}

// Do something before request is sent
export function willRequest(config) {
  return config;
}

// Do something with request error
export function willRequestError(error) {
  return Promise.reject(error);
}

// Do something with response data 处理由后端抛出的错误
export function didRequest(res) {
  // not handling error
  if (res.config.errorHandling === false) {
    return res.data;
  }
  // 200 and type = ok
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  }
  // show error
  message.error(res.data.detail + ': ' + res.data.data, 6);
  return Promise.reject(res);
}

// Do something with response error 由网络或者服务抛出的错误
export function didRequestError(error) {
  let { config } = error;
  if (config.errorHandling === false) {
    return error;
  }

  let msg = error.message;
  if (error.message.match(/timeout/)) {
    msg = '请求超时';
  } else if (error.response && error.response.data && (error.response.data.data || error.response.data.detail)) {
    msg = error.response.data.data || error.response.data.detail;
  } else {
    msg = '网络错误';
  }
  message.error(msg, 3);
  return Promise.reject(error);
}
