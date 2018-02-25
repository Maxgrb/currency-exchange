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
  SOURCE_CHANGE: 'App/SOURCE_CHANGE',
  TARGET_CHANGE: 'App/TARGET_CHANGE',
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
    type: actionTypes.RATES_FAILURE,
  }),

  changeSource: value => ({
    type: actionTypes.SOURCE_CHANGE,
    value,
  }),

  changeTarget: value => ({
    type: actionTypes.TARGET_CHANGE,
    value,
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

    case actionTypes.SOURCE_CHANGE:
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [state.inputSource]: action.value,
          [state.inputTarget]: action.value * state.rates[state.inputTarget],
        },
      };

    case actionTypes.TARGET_CHANGE:
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [state.inputSource]: action.value / state.rates[state.inputTarget],
          [state.inputTarget]: action.value,
        },
      };

    case actionTypes.CURRENCY_CHANGE:
      return {
        ...state,
      };

    case actionTypes.EXCHANGE:
      return {
        ...state,
        balance: {
          [state.inputSource]:
            state.balance[state.inputSource] - state.inputValues[state.inputSource],
          [state.inputTarget]:
            state.balance[state.inputTarget] + state.inputValues[state.inputTarget],
        },
        inputValues: {
          ...state.inputValues,
          [state.inputSource]: 0,
          [state.inputTarget]: 0,
        },
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
