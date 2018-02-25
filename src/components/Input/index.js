/**
 * Input Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const handleInput = callback => (e) => {
  const num = parseFloat(e.target.value.substr(1)) || 0;
  return callback(num);
};

const formatValue = (value, isTarget) => {
  if (!value) {
    return '0';
  }
  return isTarget > 0 ? `+${value.toFixed(2)}` : `-${value.toFixed(2)}`;
};

/* eslint-disable jsx-a11y/no-autofocus */
const Input = props => (
  <div
    className={`${styles.input} ${props.isTarget ? styles.inputTarget : ''}`}
  >
    <input
      autoFocus={!props.isTarget}
      value={formatValue(props.value, props.isTarget)}
      onChange={handleInput(props.onChange)}
      maxLength={10}
    />
    <div className={styles.inputName}>
      {props.name}
    </div>
    <div className={styles.inputBalance}>
      {`Balance: ${props.symbol}`}&thinsp;{props.balance.toLocaleString()}
    </div>
  </div >
);
/* eslint-enable jsx-a11y/no-autofocus */

Input.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  isTarget: PropTypes.bool,
};

Input.defaultProps = {
  isTarget: false,
};

export default Input;
