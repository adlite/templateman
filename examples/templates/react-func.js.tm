// Vendor
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Components
// import CompName from '../component/path';
// Styles
import style from './style.styl';

const ${TM_COMPONENT_NAME} = ({ className }) => (
  <div className={cn(style.${TM_COMPONENT_NAME}, className)}>${TM_COMPONENT_NAME} content</div>
);

${TM_COMPONENT_NAME}.defaultProps = {
  className: '',
};

${TM_COMPONENT_NAME}.propTypes = {
  className: PropTypes.string,
};

export default ${TM_COMPONENT_NAME};
