import { all } from 'redux-saga/effects';
import loginSagas from './LoginRedux/sagas';
import appSagas from './AppRedux/sagas';
import memberSagas from './MemberRedux/sagas';
import fetchCategorySagas from './CategoryRedux/sagas';
import fetchUserSagas from './UserProfileRedux/sagas';
import fetchOrderHistorySagas from './OrderHistoryRedux/sagas';
import addToCartSagas from './CartRedux/sagas';
import fetchProductSagas from './ProductRedux/sagas';
import sentDeviceTokenSagas from './NotificationRedux/sagas';

export default function* root() {
  yield all([
    ...loginSagas,
    ...appSagas,
    ...memberSagas,
    ...fetchCategorySagas,
    ...fetchUserSagas,
    ...fetchOrderHistorySagas,
    ...addToCartSagas,
    ...fetchProductSagas,
    ...sentDeviceTokenSagas
  ]);
}
