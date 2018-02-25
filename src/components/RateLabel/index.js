/**
 * RateLabel Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const RateLabel = props => (
  <div className={styles.rateLabel}>
    <div className={styles.rateLabelInner}>
      {`${props.sourceSymbol}1 = ${props.targetSymbol}${props.rate.toFixed(2)}`}
    </div>
  </div>
);

RateLabel.propTypes = {
  sourceSymbol: PropTypes.string.isRequired,
  targetSymbol: PropTypes.string.isRequired,
  rate: PropTypes.number,
};

RateLabel.defaultProps = {
  rate: 0,
};

export default RateLabel;
