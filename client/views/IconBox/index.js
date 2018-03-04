import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const IconBox = props => {
  const { icon } = props;
  return (
    <div className="icon-box">
      <div>
        <FontAwesomeIcon className="color-1" icon={icon} />
      </div>
      <div>
        <span className="copy-3">{props.children}</span>
      </div>
    </div>
  );
};

export default IconBox;
