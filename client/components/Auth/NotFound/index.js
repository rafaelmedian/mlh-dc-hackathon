import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const NotFound = ({ to }) => <Redirect to={to} />;

NotFound.defaultProps = {
  to: '/',
};

NotFound.propTypes = {
  authenticated: PropTypes.string,
};

export default NotFound;


