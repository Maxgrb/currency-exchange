/**
 * Input Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const handleInput = callback => (e) => {
  const num = parseFloat(e.target.value).toFixed(2);
  return Number.isNaN(num) && callback(num);
};

const Input = props => (
  <div
    className={`${styles.input} ${props.isTarget ? styles.inputTarget : ''}`}
  >
    <input
      value={props.value}
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

Input.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  // isTarget: PropTypes.bool,
};

Input.defaultProps = {
  // isTarget: false,
};

export default Input;
