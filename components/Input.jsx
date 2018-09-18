import React from 'react';

class Input extends React.Component {
  componentDidMount() {}

  static defaultProps = {
    placeholder: undefined,
    value: undefined,
    onChange: undefined,
    addonAfter: undefined,
  }

  render() {
    let classNames = ['app-input'];
    if (this.props.addonAfter) {
      classNames.push('with-addafter');
    }

    return (
      <div className={classNames.join(' ')}>
        <input type="text" {...this.props}/>
        <div className="app-input__addafter">
          {this.props.addonAfter}
        </div>
      </div>
    )
  }
}



export default Input;
