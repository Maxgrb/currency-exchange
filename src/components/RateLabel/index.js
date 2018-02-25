/**
 * RateLabel Component
 */
import React from 'react';
import styles from './styles.css';

const RateLabel = () => (
  <div className={styles.rateLabel}>
    <div className={styles.rateLabelInner}>
      Rates
    </div>
  </div>
);

RateLabel.propTypes = {
};

RateLabel.defaultProps = {
};

export default RateLabel;
