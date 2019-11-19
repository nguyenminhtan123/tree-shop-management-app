import Immutable from 'seamless-immutable';
import { AppTypes } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  networkStatus: null,
  language: 'en'
});

export const changeNetworkStatus = (state, { status }) =>
  state.merge({ networkStatus: status });

export const changeLanguage = (state, { language }) =>
  state.merge({ language: language });

const ACTION_HANDLERS = {
  [AppTypes.CHANGE_NETWORK_STATUS]: changeNetworkStatus,
  [AppTypes.CHANGE_LANGUAGE]: changeLanguage
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
