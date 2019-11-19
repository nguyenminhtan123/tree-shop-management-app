import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getMemberListApi } from '../../api/members';
import MemberActions, { MemberTypes } from '../MemberRedux/actions';

export function* getMemberListSaga({ isNextPage }) {
  try {
    const page = yield select(state => state.member.memberPage);
    const fetchedPage = isNextPage ? page + 1 : page;
    const response = yield call(getMemberListApi, fetchedPage);

    const newResponse = {
      data: response.results,
      total: response.total
    };

    yield put(MemberActions.getMemberListSuccess(newResponse));
  } catch (error) {
    yield put(MemberActions.getMemberListFailure(error));
  }
}

const memberSagas = () => [
  takeLatest(MemberTypes.GET_MEMBER_LIST, getMemberListSaga)
];

export default memberSagas();
