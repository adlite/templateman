// Vendor
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Components
// import CompName from '../component/path';
// Styles
import style from './style.styl';

export default class ${TM:COMPONENT_NAME} extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { className } = this.props;

    return <div className={cn(style.${TM:COMPONENT_NAME}, className)}>${TM:COMPONENT_NAME} content</div>;
  }
}
