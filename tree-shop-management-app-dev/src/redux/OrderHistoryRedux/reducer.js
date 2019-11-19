import Immutable from 'seamless-immutable';
import { OrderHistoryTypes } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  data: {},
  error: null,
  fetchOrderHistoryLoading: false,
  cancelOrderLoading: false,

  orderHistoryMemberData: {},
  orderHistoryMemberPage: 0,
  orderHistoryMemberTotal: 0,

  loading: false,
  error: null
});

const fetchOrderHistory = (state, { id }) =>
  state.merge({
    fetchOrderHistoryLoading: true
  });

const fetchOrderHistorySuccess = (state, { response }) =>
  state.merge({
    data: response,
    fetchOrderHistoryLoading: false
  });

const fetchOrderHistoryFailure = (state, { error }) =>
  state.merge({
    error: error,
    fetchOrderHistoryLoading: false
  });

const getOrderHistoryList = (state, { isNextPage }) =>
  state.merge({
    loading: true,
    error: null
  });

const getOrderHistoryListSuccess = (state, { response }) =>
  state.merge({
    orderHistoryMemberData: response,
    orderHistoryMemberTotal: response.data.length,
    loading: false,
    error: null
  });

const getOrderHistoryListFailure = (state, { error }) =>
  state.merge({ loading: false, error: error });

const updatePage = (state, { page }) =>
  state.merge({
    orderHistoryMemberPage: page
  });

const cancelOrder = (state, { id }) =>
  state.merge({
    cancelOrderLoading: true
  });

const cancelOrderSuccess = (state, { response }) =>
  state.merge({
    cancelOrderLoading: false
  });

const cancelOrderFailure = (state, { error }) =>
  state.merge({
    error: error,
    cancelOrderLoading: false
  });

const ACTION_HANDLERS = {
  [OrderHistoryTypes.FETCH_ORDER_HISTORY]: fetchOrderHistory,
  [OrderHistoryTypes.FETCH_ORDER_HISTORY_SUCCESS]: fetchOrderHistorySuccess,
  [OrderHistoryTypes.FETCH_ORDER_HISTORY_FAILURE]: fetchOrderHistoryFailure,

  [OrderHistoryTypes.GET_ORDER_HISTORY_LIST]: getOrderHistoryList,
  [OrderHistoryTypes.GET_ORDER_HISTORY_LIST_SUCCESS]: getOrderHistoryListSuccess,
  [OrderHistoryTypes.GET_ORDER_HISTORY_LIST_FAILURE]: getOrderHistoryListFailure,
  [OrderHistoryTypes.UPDATE_PAGE]: updatePage,

  [OrderHistoryTypes.CANCEL_ORDER]: cancelOrder,
  [OrderHistoryTypes.CANCEL_ORDER_SUCCESS]: cancelOrderSuccess,
  [OrderHistoryTypes.CANCEL_ORDER_FAILURE]: cancelOrderFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
