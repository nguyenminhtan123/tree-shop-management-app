import Immutable from 'seamless-immutable';
import { FetchProductTypes } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  data: [],
  error: null,
  fetchProductLoading: false
});

const fetchProduct = state =>
  state.merge({
    fetchProductLoading: true
  });

const fetchProductSuccess = (state, { response }) =>
  state.merge({
    data: response,
    fetchProductLoading: false
  });

const fetchProductFailure = (state, { error }) =>
  state.merge({
    error: error,
    fetchProductLoading: false
  });

const ACTION_HANDLERS = {
  [FetchProductTypes.FETCH_PRODUCT]: fetchProduct,
  [FetchProductTypes.FETCH_PRODUCT_SUCCESS]: fetchProductSuccess,
  [FetchProductTypes.FETCH_PRODUCT_FAILURE]: fetchProductFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
