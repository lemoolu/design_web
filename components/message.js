import React from 'react';
import { message } from 'antd';


export default {
  error: function(msg) {
    message.error(msg);
  },
  loading: function() {}
};
