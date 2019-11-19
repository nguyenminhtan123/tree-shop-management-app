import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const OrderHistoryTypes = makeConstantCreator(
  'FETCH_ORDER_HISTORY',
  'FETCH_ORDER_HISTORY_SUCCESS',
  'FETCH_ORDER_HISTORY_FAILURE',

  'GET_ORDER_HISTORY_LIST',
  'GET_ORDER_HISTORY_LIST_SUCCESS',
  'GET_ORDER_HISTORY_LIST_FAILURE',
  'UPDATE_PAGE',

  'CANCEL_ORDER',
  'CANCEL_ORDER_SUCCESS',
  'CANCEL_ORDER_FAILURE'
);

const fetchOrderHistory = id =>
  makeActionCreator(OrderHistoryTypes.FETCH_ORDER_HISTORY, { id });
const fetchOrderHistorySuccess = response =>
  makeActionCreator(OrderHistoryTypes.FETCH_ORDER_HISTORY_SUCCESS, {
    response
  });
const fetchOrderHistoryFailure = error =>
  makeActionCreator(OrderHistoryTypes.FETCH_ORDER_HISTORY_FAILURE, {
    error
  });

const getOrderHistoryList = isNextPage =>
  makeActionCreator(OrderHistoryTypes.GET_ORDER_HISTORY_LIST, { isNextPage });
const getOrderHistoryListSuccess = response =>
  makeActionCreator(OrderHistoryTypes.GET_ORDER_HISTORY_LIST_SUCCESS, {
    response
  });
const getOrderHistoryListFailure = error =>
  makeActionCreator(OrderHistoryTypes.GET_ORDER_HISTORY_LIST_FAILURE, {
    error
  });
const updatePage = page =>
  makeActionCreator(OrderHistoryTypes.UPDATE_PAGE, { page });

const cancelOrder = id =>
  makeActionCreator(OrderHistoryTypes.CANCEL_ORDER, { id });
const cancelOrderSuccess = response =>
  makeActionCreator(OrderHistoryTypes.CANCEL_ORDER_SUCCESS, {
    response
  });
const cancelOrderFailure = error =>
  makeActionCreator(OrderHistoryTypes.CANCEL_ORDER_FAILURE, {
    error
  });

export default {
  fetchOrderHistory,
  fetchOrderHistorySuccess,
  fetchOrderHistoryFailure,

  cancelOrder,
  cancelOrderSuccess,
  cancelOrderFailure,

  getOrderHistoryList,
  getOrderHistoryListSuccess,
  getOrderHistoryListFailure,
  updatePage
};
