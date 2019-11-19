import { put, call, takeLatest } from 'redux-saga/effects';
import { sentDeviceTokenByIdApi } from '../../api/auth';
import SentDeviceTokenActions, { NotificationTypes } from './actions';
import {
  showOverlay,
  showInAppNotification,
  pushScreen,
  showBottomTab
} from '../../navigation/navigationConfig/serviceActions';

export function* sentDeviceTokenSaga({ data }) {
  try {
    const response = yield call(sentDeviceTokenByIdApi, data);
    console.log('day', data, response);

    yield put(SentDeviceTokenActions.sentDeviceTokenSuccess(response));
    // return showInAppNotification('Sent', 'sent success');
  } catch (error) {
    yield put(SentDeviceTokenActions.sentDeviceTokenFailure(error));
    // return showInAppNotification('Sent', error.message, 'error');
  }
}

const sentDeviceTokenSagas = () => [
  takeLatest(NotificationTypes.SENT_DEVICE_TOKEN, sentDeviceTokenSaga)
];

export default sentDeviceTokenSagas();
