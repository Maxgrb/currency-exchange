/**
 * Redux stuff
 * Contains actions, reducers and store object with thunk and debug tool.
 * We put all together into the single file because of small state of the app.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { currencies } from './constants';
import getRates from './services';

const actionTypes = {
  RATES_REQUEST: 'App/RATES_REQUEST',
  RATES_SUCCESS: 'App/RATES_SUCCESS',
  RATES_FAILURE: 'App/RATES_FAILURE',
  ERROR: 'App/ERROR',
  VALUE_CHANGE: 'App/VALUE_CHANGE',
  CURRENCY_CHANGE: 'App/CURRENCY_CHANGE',
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
  inputValues: {
    [currencies.GBP]: 0,
    [currencies.EUR]: 0,
    [currencies.USD]: 0,
  },
  inputSource: currencies.GBP,
  inputTarget: currencies.EUR,
};

export const actions = {
  fetchRates: () => (dispatch, getState) => {
    const { inputSource } = getState();
    dispatch({ type: actionTypes.RATES_REQUEST });
    return getRates(inputSource)
      .then(rates => dispatch({
        type: actionTypes.RATES_SUCCESS,
        rates,
      }))
      .catch(() => dispatch({
        type: actionTypes.RATES_FAILURE,
      }));
  },

  handleError: () => ({
    type: actionTypes.ERROR,
  }),

  changeInput: payload => ({
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
        isError: false,
      };

    case actionTypes.RATES_SUCCESS:
      return {
        ...state,
        rates: action.rates,
        isRequest: false,
      };

    case actionTypes.RATES_FAILURE:
      return {
        ...state,
        isRequest: false,
        isError: true,
      };

    case actionTypes.ERROR:
      return {
        ...state,
        isError: true,
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
