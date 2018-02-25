/**
 * Redux stuff
 * Contains actions types, actions, reducers, and store object with thunk and debug tool.
 * We put all together into the single file because of small state of the app.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { currencies } from './constants';

export const types = {
  RATES_REQUEST: 'App/RATES_REQUEST',
  RATES_SUCCESS: 'App/RATES_SUCCESS',
  RATES_FAILURE: 'App/RATES_FAILURE',
  SOURCE_VALUE_CHANGE: 'App/SOURCE_VALUE_CHANGE',
  TARGET_VALUE_CHANGE: 'App/TARGET_VALUE_CHANGE',
  SOURCE_CURRENCY_CHANGE: 'App/SOURCE_CURRENCY_CHANGE',
  TARGET_CURRENCY_CHANGE: 'App/TARGET_CURRENCY_CHANGE',
  EXCHANGE: 'App/EXCHANGE',
};

const initialState = {
  isRequest: false,
  isError: false,
  balance: {
    [currencies.GBP]: 15000,
    [currencies.EUR]: 340,
    [currencies.USD]: 560,
  },
  source: currencies.GBP,
  sourceValue: 0,
  target: currencies.EUR,
  targetValue: 0,
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.RATES_REQUEST:
      return {
        ...state,
        isRequest: true,
        isError: false,
      };

    case types.RATES_SUCCESS:
      return {
        ...state,
        rates: action.rates,
        isRequest: false,
      };

    case types.RATES_FAILURE:
      return {
        ...state,
        isRequest: false,
        isError: true,
      };

    case types.SOURCE_VALUE_CHANGE:
      return {
        ...state,
        sourceValue: action.value,
        targetValue: Number((action.value * state.rates[state.target]).toFixed(2)),
      };

    case types.TARGET_VALUE_CHANGE:
      return {
        ...state,
        sourceValue: Number((action.value / state.rates[state.target]).toFixed(2)),
        targetValue: action.value,
      };

    case types.SOURCE_CURRENCY_CHANGE:
      return {
        ...state,
        source: action.source,
        sourceValue:
          Number((state.targetValue * state.rates[action.source]).toFixed(2)),
      };

    case types.TARGET_CURRENCY_CHANGE:
      return {
        ...state,
        target: action.target,
        targetValue:
          Number((state.sourceValue * state.rates[action.target]).toFixed(2)),
      };

    case types.EXCHANGE:
      return {
        ...state,
        balance: {
          ...state.balance,
          [state.source]: state.balance[state.source] - state.sourceValue,
          [state.target]: state.balance[state.target] + state.targetValue,
        },
        sourceValue: 0,
        targetValue: 0,
      };

    default:
      return state;
  }
};

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable no-underscore-dangle */

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
);
