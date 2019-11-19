import { put, call, takeLatest } from 'redux-saga/effects';
import { fetchProductTypesApi } from '../../api/auth';
import FetchCategoryActions, { FetchCategoryTypes } from './actions';

export function* fetchCategorySaga() {
  try {
    const data = yield call(fetchProductTypesApi);
    yield put(FetchCategoryActions.fetchCategorySuccess(data));
  } catch (error) {
    yield put(FetchCategoryActions.fetchCategoryFailure(error));
  }
}

const fetchCategorySagas = () => [
  takeLatest(FetchCategoryTypes.FETCH_CATEGORY, fetchCategorySaga)
];

export default fetchCategorySagas();
