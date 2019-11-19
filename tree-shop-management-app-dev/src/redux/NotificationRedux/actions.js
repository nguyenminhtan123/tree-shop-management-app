import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const NotificationTypes = makeConstantCreator(
  'SENT_DEVICE_TOKEN',
  'SENT_DEVICE_TOKEN_SUCCESS',
  'SENT_DEVICE_TOKEN_FAILURE'
);

const sentDeviceToken = data =>
  makeActionCreator(NotificationTypes.SENT_DEVICE_TOKEN, { data });
const sentDeviceTokenSuccess = response =>
  makeActionCreator(NotificationTypes.SENT_DEVICE_TOKEN_SUCCESS, { response });
const sentDeviceTokenFailure = error =>
  makeActionCreator(NotificationTypes.SENT_DEVICE_TOKEN_FAILURE, { error });

export default {
  sentDeviceToken,
  sentDeviceTokenSuccess,
  sentDeviceTokenFailure
};
