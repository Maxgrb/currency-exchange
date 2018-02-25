/**
 * Entry point
 * Create the main container, connect it to the store, and render it into DOM.
 */
import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import store, { actions } from './store';
import { currencies, currenciesSymbols } from './constants';
import { ErrorMessage, ExchangeButton, Input, RateLabel } from './components';
import styles from './styles.css';

class App extends Component {
  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    clearInterval(this.requestInterval);
  }

  componentDidCatch() {
    this.props.handleError();
  }

  update = () => {
    if (!this.props.isRequest) {
      this.props.fetchRates();
    }
    // this.requestInterval = setInterval(this.update, 10000);
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
      inputSource: source,
      inputTarget: target,
      rates,
      balance,
      inputValues,
      changeSourceValue,
      changeTargetValue,
      changeSourceCurrency,
      changeTargetCurrency,
      exchange,
    } = this.props;

    const isButtonDisabled = (
      inputValues[source] === 0 ||
      inputValues[target] === 0 ||
      inputValues[source] > balance[source] ||
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
              value={inputValues[source]}
              onChangeValue={changeSourceValue}
              onChangeCurrency={changeSourceCurrency}
            />
            <RateLabel
              sourceSymbol={currenciesSymbols[source]}
              targetSymbol={currenciesSymbols[target]}
              rate={rates && rates[target]}
            />
            <Input
              isTarget
              currency={currencies[target]}
              balance={balance[target]}
              value={inputValues[target]}
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
