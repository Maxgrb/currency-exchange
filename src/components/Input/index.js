/**
 * Input Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils';
import styles from './styles.css';

const Input = props => (
  <div className={styles.input}>
    <input
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      maxLength={10}
    />
    <div className={styles.inputName}>
      {props.name}
    </div>
    <div className={styles.inputBalance}>
      {`Balance: ${props.symbol}`}&thinsp;{formatCurrency(props.balance)}
    </div>
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
