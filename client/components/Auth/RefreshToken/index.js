import React, { Component } from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import withLogout from '../../../hoc/withLogout/index';
import { refreshToken } from '../../../api/users';
import withOnLoginSuccess from '../../../hoc/withOnLoginSuccess/index';
import throttle from 'lodash.throttle';

// The purpose of this file is to refresh the token when the browser refreshes.
class RefreshToken extends Component {
  state = {
    loading: false,
  };

  componentWillMount() {
    localStorage.getItem('token') && this.refresh();
    // document.addEventListener('mousemove', this.handleMouseMove);
  }

  refresh = () => {
    const {
      history,
      referrer,
      logout,
      dispatch,
      onSubmitSuccess,
    } = this.props;

    return refreshToken()
      .then((payload) => {
        return onSubmitSuccess(payload, dispatch, { history, referrer });
      })
      .catch(err => {
        console.log('err', err);
        // return logout(dispatch)
      });
  };

  render() {
    return this.props.children;
  };
}

const
  mapStateToProps = state => ({
    referrer: state.location.referrer,
    life: state.session.life,
    expired: state.session.expired,
  });

export default R
  .compose(
    withRouter,
    connect(mapStateToProps),
    withLogout,
    withOnLoginSuccess,)
  (RefreshToken);