import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const UserProfileTypes = makeConstantCreator(
  'FETCH_USER',
  'FETCH_USER_SUCCESS',
  'FETCH_USER_FAILURE',

  'CHANGE_PASSWORD',
  'CHANGE_PASSWORD_SUCCESS',
  'CHANGE_PASSWORD_FAILURE',

  'UPDATE_USER_PROFILE',
  'UPDATE_USER_PROFILE_SUCCESS',
  'UPDATE_USER_PROFILE_FAILURE'
);

const fetchUser = id => makeActionCreator(UserProfileTypes.FETCH_USER, { id });
const fetchUserSuccess = response =>
  makeActionCreator(UserProfileTypes.FETCH_USER_SUCCESS, { response });
const fetchUserFailure = error =>
  makeActionCreator(UserProfileTypes.FETCH_USER_FAILURE, { error });

const changePassword = data =>
  makeActionCreator(UserProfileTypes.CHANGE_PASSWORD, { data });
const changePasswordSuccess = response =>
  makeActionCreator(UserProfileTypes.CHANGE_PASSWORD_SUCCESS, { response });
const changePasswordFailure = error =>
  makeActionCreator(UserProfileTypes.CHANGE_PASSWORD_FAILURE, { error });

const updateUserProfile = data =>
  makeActionCreator(UserProfileTypes.UPDATE_USER_PROFILE, { data });
const updateUserProfileSuccess = response =>
  makeActionCreator(UserProfileTypes.UPDATE_USER_PROFILE_SUCCESS, { response });
const updateUserProfileFailure = error =>
  makeActionCreator(UserProfileTypes.UPDATE_USER_PROFILE_FAILURE, { error });

export default {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure,

  changePassword,
  changePasswordSuccess,
  changePasswordFailure,

  updateUserProfile,
  updateUserProfileSuccess,
  updateUserProfileFailure
};
