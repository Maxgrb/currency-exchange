/**
 * Balance Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Balance = ({ symbol, balance, isDanger }) => (
  <div className={`${styles.balance} ${isDanger ? styles.danger : ''}`} >
    {`Balance: ${symbol}`}&thinsp;{balance.toLocaleString()}
  </div >
);

Balance.propTypes = {
  symbol: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  isDanger: PropTypes.bool,
};

Balance.defaultProps = {
  isDanger: false,
};

export default Balance;
