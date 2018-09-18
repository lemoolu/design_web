/*
全局请求配置
api.test({});
api.get({});
console.log(api._config);
如需手动配置，直接调用axios
https://github.com/mzabriskie/axios
*/
import axios from 'axios';
import apiConfig from './api-config.js';
import { willRequest, willRequestError, didRequest, didRequestError } from './axios-config.js';

// axios 默认参数
const defaultOptions = {
  timeout: 30000,
  errorHandling: true, // 当前接口是否使用统一的错误处理
  withProgress: true,
};
const api = {
  _config: apiConfig
};

let customGlobalParams = {};

const instance = axios.create();
instance.interceptors.request.use(willRequest, willRequestError);
instance.interceptors.response.use(didRequest, didRequestError);

function isJsonFormat(method) {
  return ['PUT', 'POST', 'PATCH', 'DELETE'].findIndex(x => x === method.toUpperCase()) > -1;
}

for (let key of Object.keys(apiConfig)) {
  api[key] = (params, options) => {
    let opts = Object.assign({}, defaultOptions, apiConfig[key], options);
    if (isJsonFormat(opts.method)) {
      opts.data = Object.assign({}, customGlobalParams, params);
    } else {
      opts.params = Object.assign({}, customGlobalParams, params);
    }
    return instance(opts);
  };
}

export default api;

// 设置全局参数，每个请求都会带上该参数
export function setGlobalParams(params) {
  customGlobalParams = params;
}
