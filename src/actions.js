/**
 * App Actions
 */
import { types } from './store';

const fetchRates = base => (
  fetch(`https://api.fixer.io/latest?base=${base}&symbols=GBP,EUR,USD`)
    .then(resp => resp.json())
    .then(({ rates }) => ({ [base]: 1, ...rates }))
);

export const handleError = () => ({
  type: types.RATES_FAILURE,
});

export const updateRates = () => (
  async (dispatch, getState) => {
    try {
      const { source } = getState();
      dispatch({ type: types.RATES_REQUEST });
      dispatch({
        type: types.RATES_SUCCESS,
        rates: await fetchRates(source),
      });
    } catch (e) {
      dispatch(handleError());
    }
  }
);

export const changeSourceValue = value => ({
  type: types.SOURCE_VALUE_CHANGE,
  value,
});

export const changeTargetValue = value => ({
  type: types.TARGET_VALUE_CHANGE,
  value,
});

export const changeSourceCurrency = source => (
  (dispatch) => {
    dispatch({
      type: types.SOURCE_CURRENCY_CHANGE,
      source,
    });
    dispatch(updateRates(source));
  }
);

export const changeTargetCurrency = target => ({
  type: types.TARGET_CURRENCY_CHANGE,
  target,
});

export const exchange = () => ({
  type: types.EXCHANGE,
});
