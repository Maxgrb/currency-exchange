/**
 * Redux stuff
 * Contains actions, reducers and store object with thunk and debug tool.
 * We put all together into the single file because of small state of the app.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { currencies } from './constants';

const actionTypes = {
  RATES_REQUEST: 'App/RATES_REQUEST',
  RATES_SUCCESS: 'App/RATES_SUCCESS',
  RATES_FAILURE: 'App/RATES_FAILURE',
  VALUE_CHANGE: 'App/VALUE_CHANGE',
  CURRENCY_CHANGE: 'App/CURRENCY_CHANGE',
  EXCHANGE: 'App/EXCHANGE',
};

const initialState = {
  isRequest: false,
  error: undefined,
  rates: {
    [currencies.GBP]: 1.0,
    [currencies.EUR]: 1.0,
    [currencies.USD]: 1.0,
  },
  balance: {
    [currencies.GBP]: 15000,
    [currencies.EUR]: 340,
    [currencies.USD]: 560,
  },
  inputValues: {
    [currencies.GBP]: 0,
    [currencies.EUR]: 0,
    [currencies.USD]: 0,
  },
  inputFrom: currencies.GBP,
  inputTo: currencies.EUR,
};

export const actions = {
  loadRates: () => ({
    type: actionTypes.RATES_REQUEST,
  }),

  changeValue: payload => ({
    type: actionTypes.VALUE_CHANGE,
    payload,
  }),

  changeCurrency: () => ({
    type: actionTypes.CURRENCY_CHANGE,
  }),

  exchange: () => ({
    type: actionTypes.EXCHANGE,
  }),
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RATES_REQUEST:
      return {
        ...state,
        isRequest: true,
        error: undefined,
      };

    case actionTypes.RATES_SUCCESS:
      return {
        ...state,
        rates: action.rates,
        isRequest: true,
      };

    case actionTypes.RATES_FAILURE:
      return {
        ...state,
        isRequest: false,
        error: action.error,
      };

    case actionTypes.VALUE_CHANGE:
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          ...action.payload,
        },
      };

    case actionTypes.CURRENCY_CHANGE:
      return {
        ...state,
      };

    case actionTypes.EXCHANGE:
      return {
        ...state,
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

