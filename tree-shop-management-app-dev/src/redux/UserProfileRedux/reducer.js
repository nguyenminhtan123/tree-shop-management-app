import Immutable from 'seamless-immutable';
import { UserProfileTypes } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  data: {},
  error: null,
  token: null,
  changePassword: false,
  fetchUserLoading: false,
  changePasswordLoading: false,
  updateUserProfile: false
});

const fetchUser = (state, { id }) =>
  state.merge({
    fetchUserLoading: true
  });

const fetchUserSuccess = (state, { response }) =>
  state.merge({
    data: response,
    fetchUserLoading: false
  });

const fetchUserFailure = (state, { error }) =>
  state.merge({
    error: error,
    fetchUserLoading: false
  });

const changePassword = (state, { data }) =>
  state.merge({
    changePasswordLoading: true
  });

const changePasswordSuccess = (state, { response }) =>
  state.merge({
    changePassword: true,
    token: response.token,
    changePasswordLoading: false
  });

const changePasswordFailure = (state, { error }) =>
  state.merge({
    error: error,
    changePasswordLoading: false
  });

const updateUserProfile = (state, { data }) =>
  state.merge({
    updateUserProfile: true
  });

const updateUserProfileSuccess = (state, { response }) =>
  state.merge({
    updateUserProfile: false
  });

const updateUserProfileFailure = (state, { error }) =>
  state.merge({
    error: error,
    updateUserProfile: false
  });

const ACTION_HANDLERS = {
  [UserProfileTypes.FETCH_USER]: fetchUser,
  [UserProfileTypes.FETCH_USER_SUCCESS]: fetchUserSuccess,
  [UserProfileTypes.FETCH_USER_FAILURE]: fetchUserFailure,

  [UserProfileTypes.CHANGE_PASSWORD]: changePassword,
  [UserProfileTypes.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
  [UserProfileTypes.CHANGE_PASSWORD_FAILURE]: changePasswordFailure,

  [UserProfileTypes.UPDATE_USER_PROFILE]: updateUserProfile,
  [UserProfileTypes.UPDATE_USER_PROFILE_SUCCESS]: updateUserProfileSuccess,
  [UserProfileTypes.UPDATE_USER_PROFILE_FAILURE]: updateUserProfileFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
