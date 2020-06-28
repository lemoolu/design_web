import React from 'react';
import './style.less';

export default function Line({ color } = {}) {
  color = color || '#B7B7B7';
  return (
    <div className="line" style={{background: color}}></div>
  )
}
