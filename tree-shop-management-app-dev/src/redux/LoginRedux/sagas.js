import { put, call, takeLatest } from 'redux-saga/effects';
import {
  adminLoginApi,
  signUpApi,
  forgotPasswordApi,
  confirmCodeApi,
  resetPasswordApi
} from '../../api/auth';

import LoginActions, { LoginTypes } from '../LoginRedux/actions';

import AppActions from '../AppRedux/actions';
import {
  showOverlay,
  showInAppNotification,
  pushScreen,
  showBottomTab
} from '../../navigation/navigationConfig/serviceActions';
import UserActions from '../UserProfileRedux/actions';
import OrderHistoryActions from '../OrderHistoryRedux/actions';
import ListCategoryActions from '../CategoryRedux/actions';
import ListProductActions from '../ProductRedux/actions';
export function* logoutSaga() {
  try {
    yield put(AppActions.startup());
    global.token = null;
  } catch (error) {}
}

export function* adminLoginSaga({ data }) {
  try {
    const response = yield call(adminLoginApi, data);

    yield put(LoginActions.loginSuccess(response));
    global.token = response.token;
    yield put(AppActions.startup());
    yield put(UserActions.fetchUser(response.id));
    yield put(OrderHistoryActions.fetchOrderHistory(response.id));
    yield put(ListCategoryActions.fetchCategory());
    yield put(ListProductActions.fetchProduct());
    showInAppNotification('Sign In', 'Welcome to Tree of Life');
  } catch (error) {
    yield put(LoginActions.loginFailure(error));
    if (error.code === 403 || error.code === 409) {
      return showInAppNotification('Sign In', error.message, 'error');
    }

    return showInAppNotification('Sign In', 'Check your connection', 'error');
  }
}

export function* signUpSaga({ data }) {
  try {
    const response = yield call(signUpApi, data);

    yield put(LoginActions.signUpSuccess(response));
    global.token = response.token;
    yield put(AppActions.startup());
    yield put(UserActions.fetchUser(response.id));
    yield put(OrderHistoryActions.fetchOrderHistory(response.id));
    yield put(ListCategoryActions.fetchCategory());
    yield put(ListProductActions.fetchProduct());
    showInAppNotification('Sign Up', 'Sign Up Success');
  } catch (error) {
    yield put(LoginActions.signUpFailure(error));
    if (error.code === 409) {
      return showInAppNotification('Sign Up', error.message, 'error');
    }
    return showInAppNotification('Sign Up', 'Check your connection', 'error');
  }
}
// 1
export function* forgotPasswordSaga({ data }) {
  try {
    const response = yield call(forgotPasswordApi, data);
    yield put(LoginActions.forgotPasswordSuccess(response));
    showInAppNotification(
      'Forgot Password',
      'Already sent a confirmation email'
    );
  } catch (error) {
    yield put(LoginActions.forgotPasswordFailure(error));
    if (error.code === 409) {
      return showInAppNotification('Forgot Password', error.message, 'error');
    }
  }
}

// 2
export function* confirmCodeSaga({ data }) {
  try {
    const response = yield call(confirmCodeApi, data);
    yield put(LoginActions.confirmCodeSuccess(response));
    return showInAppNotification('Confirm Code', 'Confirm Code Success');
  } catch (error) {
    yield put(LoginActions.confirmCodeFailure(error));
    if (error.code === 409) {
      return showInAppNotification('Confirm Code', error.message, 'error');
    }
    return showInAppNotification(
      'Confirm Code',
      'Check your connection',
      'error'
    );
  }
}
// 3
export function* resetPasswordSaga({ data }) {
  try {
    const response = yield call(resetPasswordApi, data);
    yield put(LoginActions.resetPasswordSuccess(response));
    global.token = response.token;
    yield put(AppActions.startup());
    yield put(UserActions.fetchUser(response.id));
    yield put(OrderHistoryActions.fetchOrderHistory(response.id));
    yield put(ListCategoryActions.fetchCategory());
    yield put(ListProductActions.fetchProduct());
    showInAppNotification('Sign In', 'Welcome to Tree of Life');
  } catch (error) {
    yield put(LoginActions.resetPasswordFailure(error));
    if (error.code === 409) {
      return showInAppNotification('Reset Password', error.message, 'error');
    }
    return showInAppNotification(
      'Reset Password',
      'Check your connection',
      'error'
    );
  }
}

const loginSagas = () => [
  takeLatest(LoginTypes.LOGIN, adminLoginSaga),
  takeLatest(LoginTypes.LOGOUT, logoutSaga),
  takeLatest(LoginTypes.FORGOT_PASSWORD, forgotPasswordSaga),
  takeLatest(LoginTypes.SIGNUP, signUpSaga),
  takeLatest(LoginTypes.CONFIRM_CODE, confirmCodeSaga),
  takeLatest(LoginTypes.RESET_PASSWORD, resetPasswordSaga)
];

export default loginSagas();
