// Vendor
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Components
// import CompName from '../component/path';
// Styles
import style from './style.styl';

const ${TM:COMPONENT_NAME} = ({ className }) => (
  <div className={cn(style.${TM:COMPONENT_NAME}, className)}>${TM:COMPONENT_NAME} content</div>
);

${TM:COMPONENT_NAME}.defaultProps = {
  className: '',
};

${TM:COMPONENT_NAME}.propTypes = {
  className: PropTypes.string,
};

export default ${TM:COMPONENT_NAME};
