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
    this.props.loadRates();
  }

  componentDidCatch() {
    this.props.handleError();
  }

  render() {
    const {
      isError,
      inputFrom: from,
      inputTo: to,
      balance,
      inputValues,
      changeInput,
      exchange,
    } = this.props;

    const isButtonDisabled = (
      inputValues[from] === 0 ||
      inputValues[to] === 0
    );

    return (
      <div className={styles.app}>
        {isError ?
          <ErrorMessage />
          :
          <Fragment>
            <Input
              name={currencies[from]}
              symbol={currenciesSymbols[from]}
              balance={balance[from]}
              value={inputValues[from]}
              onChange={value => changeInput({ [from]: value })}
            />
            <RateLabel />
            <Input
              name={currencies[to]}
              symbol={currenciesSymbols[to]}
              balance={balance[to]}
              value={inputValues[to]}
              onChange={value => changeInput({ [to]: value })}
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
