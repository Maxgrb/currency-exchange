/**
 * Input Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Balance, Dropdown } from '../../components';
import { currencies, currenciesSymbols } from '../../constants';
import styles from './styles.css';

const handleInput = onChange => (e) => {
  const { value } = e.target;

  const num = value.replace(/\+|-/ig, '');

  if (!num) {
    return onChange(0);
  }

  if (num.match('^[0-9]{1,9}([.][0-9]{1,2})?$')) {
    return onChange(parseFloat(num));
  }

  return undefined;
};

/* eslint-disable jsx-a11y/no-autofocus */
const Input = (props) => {
  const className = `${styles.input} ${props.isTarget ? styles.target : ''}`;
  const value = `${props.isTarget ? '+' : '-'}${props.value}`;

  return (
    <div className={className}>
      <input
        type="text"
        autoFocus={!props.isTarget}
        value={value}
        onFocus={e => e.target.select()}
        onChange={handleInput(props.onChangeValue, value)}
      />
      <Dropdown
        current={props.currency}
        options={currencies}
        onChange={props.onChangeCurrency}
      />
      <Balance
        balance={props.balance}
        symbol={currenciesSymbols[props.currency]}
        isDanger={!props.isTarget && props.value > props.balance}
      />
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
