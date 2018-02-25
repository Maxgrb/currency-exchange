/**
 * Entry point
 * Create the main container, connect it to the store, and render it into DOM.
 */
import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import store from './store';
import * as actions from './actions';
import { currencies, currenciesSymbols } from './constants';
import { ErrorMessage, ExchangeButton, Input, RateLabel } from './components';
import styles from './styles.css';

class App extends Component {
  componentDidMount() {
    this.update();
    this.requestInterval = setInterval(this.update, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.requestInterval);
  }

  componentDidCatch() {
    this.props.handleError();
  }

  update = () => {
    if (!this.props.isRequest) {
      this.props.updateRates();
    }
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.exchange();
    }
  }

  render() {
    const {
      isRequest,
      isError,
      rates,
      balance,
      source,
      target,
      sourceValue,
      targetValue,
      changeSourceValue,
      changeTargetValue,
      changeSourceCurrency,
      changeTargetCurrency,
      exchange,
    } = this.props;

    const isButtonDisabled = (
      source === target ||
      sourceValue === 0 ||
      targetValue === 0 ||
      sourceValue > balance[source] ||
      isRequest
    );

    return (
      <div
        role="Application"
        className={styles.app}
        onKeyDown={!isButtonDisabled ? this.handleKeyDown : undefined}
      >
        {isError ?
          <ErrorMessage />
          :
          <Fragment>
            <Input
              currency={currencies[source]}
              balance={balance[source]}
              value={sourceValue}
              onChangeValue={changeSourceValue}
              onChangeCurrency={changeSourceCurrency}
            />
            <RateLabel
              isLoading={isRequest}
              sourceSymbol={currenciesSymbols[source]}
              targetSymbol={currenciesSymbols[target]}
              rate={rates && rates[target]}
            />
            <Input
              isTarget
              currency={currencies[target]}
              balance={balance[target]}
              value={targetValue}
              onChangeValue={changeTargetValue}
              onChangeCurrency={changeTargetCurrency}
            />
            <ExchangeButton
              onClick={exchange}
              disabled={isButtonDisabled}
            />
          </Fragment>
        }
      </div>
    );
  }
}

const ConnectedApp = connect(
  state => state,
  dispatch => bindActionCreators(actions, dispatch),
)(App);

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app-root'),
);
