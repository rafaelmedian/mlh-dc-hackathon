import React from 'react';
import PropTypes from 'prop-types'
import cert from '../../assets/certificate.jpg';
import Confetti from 'react-confetti';
import sizeMe from 'react-sizeme';

const CertPage = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(class Example extends React.PureComponent {
  static propTypes = {
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  };

  render() {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh'
      }}>
        <img src={cert} className="img-fluid" />
        <Confetti {...this.props.size} />
        <div className="cert-box">
          <label>Certificate URL:</label>
          <p className="cert-link">
            http://volonto/cert/234234.com
          </p>
        </div>
      </div>
    )
  }
});

CertPage.propTypes = {
  children: PropTypes.node,
};

CertPage.defaultProps = {};

export default CertPage;