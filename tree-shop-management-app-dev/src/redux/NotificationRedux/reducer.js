import Immutable from 'seamless-immutable';
import { NotificationTypes } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';
import { convertArrayToObject } from '../../utils/functions';
import { uniq } from 'lodash';

export const INITIAL_STATE = Immutable({
  data: {},
  error: null,
  sentDeviceTokenLoading: false,
  isSentSuccess: false
});

const sentDeviceToken = state =>
  state.merge({
    sentDeviceTokenLoading: true
  });

const sentDeviceTokenSuccess = (state, { response }) =>
  state.merge({
    //data: response,
    sentDeviceTokenLoading: false,
    isSentSuccess: true
  });

const sentDeviceTokenFailure = (state, { error }) =>
  state.merge({
    error: error,
    sentDeviceTokenLoading: false,
    isSentSuccess: false
  });

const ACTION_HANDLERS = {
  [NotificationTypes.SENT_DEVICE_TOKEN]: sentDeviceToken,
  [NotificationTypes.SENT_DEVICE_TOKEN_SUCCESS]: sentDeviceTokenSuccess,
  [NotificationTypes.SENT_DEVICE_TOKEN_FAILURE]: sentDeviceTokenFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
