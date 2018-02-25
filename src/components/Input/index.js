/**
 * Input Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';


const handleInput = onChange => (e) => {
  const { value } = e.target;

  if (!value) {
    return onChange(0);
  }

  const num = parseFloat(value);
  return !Number.isNaN(num) ? onChange(num) : undefined;
};


/* eslint-disable jsx-a11y/no-autofocus */
const Input = props => (
  <div
    className={`${styles.input} ${props.isTarget ? styles.inputTarget : ''}`}
  >
    <input
      type="number"
      step="0.01"
      autoFocus={!props.isTarget}
      value={props.value}
      onChange={handleInput(props.onChange)}
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
