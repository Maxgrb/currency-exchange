/**
 * Input Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '../../components';
import { currencies, currenciesSymbols } from '../../constants';
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
const Input = (props) => {
  const mainStyle = `${styles.input} ${props.isTarget ? styles.inputTarget : ''}`;
  const balanceStyle = `${styles.inputBalance} ${!props.isTarget && props.value > props.balance ? styles.warn : ''}`;

  return (
    <div className={mainStyle}>
      <input
        type="number"
        step="0.01"
        autoFocus={!props.isTarget}
        value={props.value}
        onChange={handleInput(props.onChangeValue)}
      />
      <Dropdown
        current={props.currency}
        options={currencies}
        onChange={props.onChangeCurrency}
      />
      <div className={balanceStyle} >
        {`Balance: ${currenciesSymbols[props.currency]}`}&thinsp;{props.balance.toLocaleString()}
      </div>
    </div>
  );
};
/* eslint-enable jsx-a11y/no-autofocus */

Input.propTypes = {
  currency: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onChangeCurrency: PropTypes.func.isRequired,
  isTarget: PropTypes.bool,
};

Input.defaultProps = {
  isTarget: false,
};

export default Input;
