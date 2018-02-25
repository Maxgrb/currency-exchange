/**
 * RateLabel Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const RateLabel = ({ sourceSymbol, targetSymbol, rate }) => (
  <div className={styles.rateLabel}>
    <div className={styles.rateLabelInner}>
      {`${sourceSymbol}1 = ${targetSymbol}${rate.toFixed(2)}`}
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
