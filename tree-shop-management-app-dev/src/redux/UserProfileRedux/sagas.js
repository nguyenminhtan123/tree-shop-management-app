import { put, call, takeLatest } from 'redux-saga/effects';
import {
  fetchUserApi,
  changePasswordByIdApi,
  UpdateUserProfileByIdApi
} from '../../api/auth';
import UserProfileActions, { UserProfileTypes } from './actions';
import LoginActions, { LoginTypes } from '../LoginRedux/actions';
import AppActions from '../AppRedux/actions';
import {
  showInAppNotification,
  showConfirmAlert,
  pushScreen
} from '../../navigation/navigationConfig/serviceActions';

export function* fetchUserSaga({ id }) {
  try {
    const data = yield call(fetchUserApi, id);
    yield put(UserProfileActions.fetchUserSuccess(data));
  } catch (error) {
    yield put(UserProfileActions.fetchUserFailure(error));
  }
}

export function* changePasswordSaga({ data }) {
  try {
    const response = yield call(changePasswordByIdApi, data);
    yield put(UserProfileActions.changePasswordSuccess(response));
    global.token = response.token;
    showInAppNotification('Change Password', 'Change password success');
  } catch (error) {
    yield put(UserProfileActions.changePasswordFailure(error));
    if (error.code === 403) {
      return showInAppNotification('Change Password', error.message, 'error');
    }
  }
}

export function* updateUserProfileSaga({ data }) {
  try {
    const response = yield call(UpdateUserProfileByIdApi, data);
    yield put(UserProfileActions.updateUserProfileSuccess(response));
    yield put(UserProfileActions.fetchUser(data.userId));
    showInAppNotification('User Profile', 'Update User Profile success');
  } catch (error) {
    yield put(UserProfileActions.updateUserProfileFailure(error));
    if (error.code === 403) {
      return showInAppNotification('User Profile', error.message, 'error');
    }
  }
}

const fetchUserSagas = () => [
  takeLatest(UserProfileTypes.FETCH_USER, fetchUserSaga),
  takeLatest(UserProfileTypes.CHANGE_PASSWORD, changePasswordSaga),
  takeLatest(UserProfileTypes.UPDATE_USER_PROFILE, updateUserProfileSaga)
];

export default fetchUserSagas();
