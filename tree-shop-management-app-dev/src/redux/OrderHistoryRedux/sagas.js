import { put, call, takeLatest, select } from 'redux-saga/effects';
import { fetchOrderHistoryApi, cancelOrderApi } from '../../api/auth';
import { getOrderHistoryListApi } from '../../api/orderHistoryMember';
import OrderHistoryActions, { OrderHistoryTypes } from './actions';
import {
  showOverlay,
  showInAppNotification,
  pushScreen,
  showBottomTab
} from '../../navigation/navigationConfig/serviceActions';

export function* fetchOrderHistorySaga({ id }) {
  try {
    const data = yield call(fetchOrderHistoryApi, id);
    yield put(OrderHistoryActions.fetchOrderHistorySuccess(data));
  } catch (error) {
    yield put(OrderHistoryActions.fetchOrderHistoryFailure(error));
  }
}

export function* cancelOrderSaga({ id }) {
  try {
    const userId = yield select(state => state.login.data.id);
    const data = yield call(cancelOrderApi, id);
    yield put(OrderHistoryActions.cancelOrderSuccess(data));
    yield put(OrderHistoryActions.fetchOrderHistory(userId));
    return showInAppNotification('Cancel Order', 'Cancel order success');
  } catch (error) {
    yield put(OrderHistoryActions.cancelOrderFailure(error));
    return showInAppNotification('CancelOrder', error.message, 'error');
  }
}

export function* getOrderHistoryListSaga({ isNextPage }) {
  try {
    const page = yield select(
      state => state.orderHistory.orderHistoryMemberPage
    );
    const userId = yield select(state => state.login.data.id);
    const fetchedPage = isNextPage ? page + 1 : page;
    const response = yield call(getOrderHistoryListApi, userId, fetchedPage);
    console.log(response);

    const newResponse = {
      data: response,
      total: response.data.length
    };
    yield put(OrderHistoryActions.getOrderHistoryListSuccess(newResponse));
  } catch (error) {
    yield put(OrderHistoryActions.getOrderHistoryListFailure(error));
  }
}

const fetchOrderHistorySagas = () => [
  takeLatest(OrderHistoryTypes.FETCH_ORDER_HISTORY, fetchOrderHistorySaga),
  takeLatest(OrderHistoryTypes.GET_ORDER_HISTORY_LIST, getOrderHistoryListSaga),
  takeLatest(OrderHistoryTypes.CANCEL_ORDER, cancelOrderSaga)
];

export default fetchOrderHistorySagas();
