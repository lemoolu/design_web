import React from 'react';

class Button extends React.Component {
  componentDidMount() {}

  static defaultProps = {
    style: undefined,
    onClick: undefined,
    type: 'default',
    size: 'normal', // small large
  }

  render() {
    let classNames = ['app-btn'];
    if (this.props.className) {
      classNames.push(this.props.className);
    }
    classNames.push(this.props.size);
    classNames.push(this.props.type);

    return (
      <button className={classNames.join(' ')} style={this.props.style} onClick={this.props.onClick}>{this.props.children}</button>
    )
  }
}



export default Button;
