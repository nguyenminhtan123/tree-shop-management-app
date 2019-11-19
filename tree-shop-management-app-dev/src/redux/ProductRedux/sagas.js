import { put, call, takeLatest } from 'redux-saga/effects';
import { fetchProductApi } from '../../api/auth';
import FetchProductActions, { FetchProductTypes } from './actions';

export function* fetchProductSaga() {
  try {
    const data = yield call(fetchProductApi);
    yield put(FetchProductActions.fetchProductSuccess(data));
  } catch (error) {
    yield put(FetchProductActions.fetchProductFailure(error));
  }
}

const fetchProductSagas = () => [
  takeLatest(FetchProductTypes.FETCH_PRODUCT, fetchProductSaga)
];

export default fetchProductSagas();
