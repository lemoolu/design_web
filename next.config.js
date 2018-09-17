const withLess = require('@zeit/next-less');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());


module.exports = withLess({
  webpack(config, options) {
    // 配置 import app地址
    config.resolve.alias.app = appDirectory;
    return config;
  }
})
