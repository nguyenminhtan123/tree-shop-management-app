import Immutable from 'seamless-immutable';
import { LoginTypes } from './actions';

import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  data: {},
  error: null,
  token: null,
  forgotPasswordData: {},
  confirmCode: false,
  loginLoading: false,
  signUpLoading: false,
  forgotPasswordLoading: false,
  confirmCodeLoading: false,
  resetPasswordLoading: false
});

const login = (state, { data }) =>
  state.merge({
    loginLoading: true
  });

const loginSuccess = (state, { response }) =>
  state.merge({
    data: response,
    token: response.token,
    loginLoading: false
  });

const loginFailure = (state, { error }) =>
  state.merge({
    error: error,
    loginLoading: false
  });

const logout = state => INITIAL_STATE;

const signUp = (state, { data }) =>
  state.merge({
    signUpLoading: true
  });

const signUpSuccess = (state, { response }) =>
  state.merge({
    data: response,
    token: response.token,
    signUpLoading: false
  });

const signUpFailure = (state, { error }) =>
  state.merge({
    error: error,
    signUpLoading: false
  });
// 1
const forgotPassword = (state, { data }) =>
  state.merge({
    forgotPasswordLoading: true
  });

const forgotPasswordSuccess = (state, { response }) =>
  state.merge({
    forgotPasswordData: response,
    forgotPasswordLoading: false
  });

const forgotPasswordFailure = (state, { error }) =>
  state.merge({
    error: error,
    forgotPasswordLoading: false
  });
// 2
const confirmCode = (state, { data }) =>
  state.merge({
    confirmCodeLoading: true
  });

const confirmCodeSuccess = (state, { response }) =>
  state.merge({
    confirmCode: true,
    confirmCodeLoading: false
  });

const confirmCodeFailure = (state, { error }) =>
  state.merge({
    error: error,
    confirmCodeLoading: false
  });
// 3
const resetPassword = (state, { data }) =>
  state.merge({
    resetPasswordLoading: true
  });

const resetPasswordSuccess = (state, { response }) =>
  state.merge({
    data: response,
    token: response.token,
    resetPasswordLoading: false
  });

const resetPasswordFailure = (state, { error }) =>
  state.merge({
    error: error,
    resetPasswordLoading: false
  });
//
const ACTION_HANDLERS = {
  [LoginTypes.LOGIN]: login,
  [LoginTypes.LOGIN_SUCCESS]: loginSuccess,
  [LoginTypes.LOGIN_FAILURE]: loginFailure,
  [LoginTypes.LOGOUT]: logout,

  [LoginTypes.FORGOT_PASSWORD]: forgotPassword,
  [LoginTypes.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
  [LoginTypes.FORGOT_PASSWORD_FAILURE]: forgotPasswordFailure,

  [LoginTypes.SIGNUP]: signUp,
  [LoginTypes.SIGNUP_SUCCESS]: signUpSuccess,
  [LoginTypes.SIGNUP_FAILURE]: signUpFailure,

  [LoginTypes.CONFIRM_CODE]: confirmCode,
  [LoginTypes.CONFIRM_CODE_SUCCESS]: confirmCodeSuccess,
  [LoginTypes.CONFIRM_CODE_FAILURE]: confirmCodeFailure,

  [LoginTypes.RESET_PASSWORD]: resetPassword,
  [LoginTypes.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [LoginTypes.RESET_PASSWORD_FAILURE]: resetPasswordFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
