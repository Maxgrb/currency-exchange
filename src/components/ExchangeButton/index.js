/**
 * ExchangeButton Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const ExchangeButton = ({ disabled, onClick }) => (
  <button
    type="button"
    className={styles.exchangeButton}
    aria-label="Exchange"
    disabled={disabled}
    onClick={onClick}
  >
    Exchange
  </button>
);

ExchangeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ExchangeButton;
