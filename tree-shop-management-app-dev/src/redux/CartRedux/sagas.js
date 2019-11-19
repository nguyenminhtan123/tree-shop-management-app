import { put, call, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';
import {
  addToCartByIdApi,
  fetchProductsInCartApi,
  minusQuantityApi,
  plusQuantityApi,
  orderApi,
  deleteProductApi,
  deleteAllProductApi
} from '../../api/auth';

import { getCartListApi } from '../../api/cartMember';

import CartActions, { CartTypes } from './actions';
import OrderHistoryActions from '../OrderHistoryRedux/actions';

import {
  showOverlay,
  showInAppNotification,
  pushScreen,
  showBottomTab
} from '../../navigation/navigationConfig/serviceActions';

export function* addToCartSaga({ data }) {
  try {
    const response = yield call(addToCartByIdApi, data);
    const newResponse = {
      data: response,
      total: response.length
    };

    yield put(CartActions.addToCartSuccess(newResponse));
  } catch (error) {
    yield put(CartActions.addToCartFailure(error));
    if (error.code === 403) {
      return showInAppNotification('Add to Cart', error.message, 'error');
    }
    return showInAppNotification(
      'Add to Cart',
      'Check your connection',
      'error'
    );
  }
}

export function* plusQuantitySaga({ data }) {
  try {
    const productId = data.requestData.prodId;
    const response = yield call(plusQuantityApi, data);
    const filterResponse = response.filter(item => item.prodId === productId);
    const newResponse = {
      productId: productId,
      data: _.head(filterResponse)
    };
    yield put(CartActions.plusQuantitySuccess(newResponse));
  } catch (error) {
    yield put(CartActions.plusQuantityFailure(error));
    if (error.code === 403) {
      return showInAppNotification('Change Quantity', error.message, 'error');
    }
    return showInAppNotification('Change Quantity', error.message, 'error');
  }
}

export function* minusQuantitySaga({ data }) {
  try {
    const productId = data.requestData.prodId;
    const response = yield call(minusQuantityApi, data);
    const filterResponse = response.filter(item => item.prodId === productId);
    const newResponse = {
      productId: productId,
      data: _.head(filterResponse)
    };
    yield put(CartActions.minusQuantitySuccess(newResponse));
  } catch (error) {
    yield put(CartActions.minusQuantityFailure(error));
    if (error.code === 403) {
      return showInAppNotification('Change Quantity', error.message, 'error');
    }
    return showInAppNotification('Change Quantity', error.message, 'error');
  }
}

export function* orderSaga({ data }) {
  try {
    const response = yield call(orderApi, data);
    const userId = yield select(state => state.login.data.id);

    yield put(CartActions.orderSuccess(response));
    yield put(OrderHistoryActions.fetchOrderHistory(userId));
    showInAppNotification('Order', 'Order Success');
  } catch (error) {
    yield put(CartActions.orderFailure(error));
  }
}

export function* getCartListSaga({ isNextPage }) {
  try {
    const page = yield select(state => state.addToCart.cartMemberPage);
    const userId = yield select(state => state.login.data.id);
    const fetchedPage = isNextPage ? page + 1 : page;
    const response = yield call(getCartListApi, userId, fetchedPage);

    const newResponse = {
      data: response,
      total: response.length
    };
    yield put(CartActions.getCartListSuccess(newResponse));
  } catch (error) {
    yield put(CartActions.getCartListFailure(error));
  }
}

export function* deleteProductSaga({ data }) {
  try {
    yield call(deleteProductApi, data);
    yield put(CartActions.deleteProductSuccess(data.prodId));
    showInAppNotification('Cart', 'Delete Success');
  } catch (error) {
    yield put(CartActions.deleteProductFailure(error));
  }
}

export function* deleteAllProductSaga({ data }) {
  try {
    const response = yield call(deleteAllProductApi, data);

    yield put(CartActions.deleteAllProductSuccess(response));
    showInAppNotification('Cart', 'Delete all product Success');
  } catch (error) {
    yield put(CartActions.deleteAllProductFailure(error));
  }
}

const addToCartSagas = () => [
  takeLatest(CartTypes.ADD_TO_CART, addToCartSaga),
  //takeLatest(CartTypes.FETCH_PRODUCTS_IN_CART, fetchProductsCartSaga),
  takeLatest(CartTypes.PLUS_QUANTITY, plusQuantitySaga),
  takeLatest(CartTypes.MINUS_QUANTITY, minusQuantitySaga),
  takeLatest(CartTypes.ORDER, orderSaga),
  takeLatest(CartTypes.GET_CART_LIST, getCartListSaga),
  takeLatest(CartTypes.DELETE_PRODUCT, deleteProductSaga),
  takeLatest(CartTypes.DELETE_ALL_PRODUCT, deleteAllProductSaga)
];

export default addToCartSagas();
