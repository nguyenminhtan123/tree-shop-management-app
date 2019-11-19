import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const LoginTypes = makeConstantCreator(
  'LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'LOGOUT',

  'SIGNUP',
  'SIGNUP_SUCCESS',
  'SIGNUP_FAILURE',

  'FORGOT_PASSWORD',
  'FORGOT_PASSWORD_SUCCESS',
  'FORGOT_PASSWORD_FAILURE',

  'CONFIRM_CODE',
  'CONFIRM_CODE_SUCCESS',
  'CONFIRM_CODE_FAILURE',

  'RESET_PASSWORD',
  'RESET_PASSWORD_SUCCESS',
  'RESET_PASSWORD_FAILURE'
);

const login = data => makeActionCreator(LoginTypes.LOGIN, { data });
const loginSuccess = response =>
  makeActionCreator(LoginTypes.LOGIN_SUCCESS, { response });
const loginFailure = error =>
  makeActionCreator(LoginTypes.LOGIN_FAILURE, { error });
const logout = () => makeActionCreator(LoginTypes.LOGOUT);

const signUp = data => makeActionCreator(LoginTypes.SIGNUP, { data });
const signUpSuccess = response =>
  makeActionCreator(LoginTypes.SIGNUP_SUCCESS, { response });
const signUpFailure = error =>
  makeActionCreator(LoginTypes.SIGNUP_FAILURE, { error });

const forgotPassword = data =>
  makeActionCreator(LoginTypes.FORGOT_PASSWORD, { data });
const forgotPasswordSuccess = response =>
  makeActionCreator(LoginTypes.FORGOT_PASSWORD_SUCCESS, { response });
const forgotPasswordFailure = error =>
  makeActionCreator(LoginTypes.FORGOT_PASSWORD_FAILURE, { error });

const confirmCode = data =>
  makeActionCreator(LoginTypes.CONFIRM_CODE, { data });
const confirmCodeSuccess = response =>
  makeActionCreator(LoginTypes.CONFIRM_CODE_SUCCESS, { response });
const confirmCodeFailure = error =>
  makeActionCreator(LoginTypes.CONFIRM_CODE_FAILURE, { error });

const resetPassword = data =>
  makeActionCreator(LoginTypes.RESET_PASSWORD, { data });
const resetPasswordSuccess = response =>
  makeActionCreator(LoginTypes.RESET_PASSWORD_SUCCESS, { response });
const resetPasswordFailure = error =>
  makeActionCreator(LoginTypes.RESET_PASSWORD_FAILURE, { error });

export default {
  login,
  loginSuccess,
  loginFailure,
  logout,

  signUp,
  signUpSuccess,
  signUpFailure,

  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordFailure,

  confirmCode,
  confirmCodeSuccess,
  confirmCodeFailure,

  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure
};
