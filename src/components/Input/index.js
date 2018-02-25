/**
 * Input Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Input = props => (
  <div className={styles.input}>
    {props.name}
    {`${props.balance} ${props.symbol}`}
    <input
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      maxLength={100}
    />
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
