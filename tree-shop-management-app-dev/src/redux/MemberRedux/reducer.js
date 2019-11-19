import Immutable from 'seamless-immutable';
import { uniq } from 'lodash';
import { MemberTypes } from './actions';
import { LoginTypes } from '../LoginRedux/actions';
import { makeReducerCreator } from '../../utils/reduxUtils';
import { convertArrayToObject } from '../../utils/functions';

export const INITIAL_STATE = Immutable({
  memberData: {},
  memberIds: [],
  memberPage: 0,
  memberTotal: 0,

  loading: false,
  error: null
});

const getMemberList = (state, { isNextPage }) =>
  state.merge({
    loading: true,
    error: null
  });

const getMemberListSuccess = (state, { response }) => {
  const formattedObjectData = state.memberData.merge(
    convertArrayToObject(response.data, 'id')
  );

  return state
    .merge({
      memberIds: uniq([...state.memberIds, ...response.data.map(e => e.id)]),
      memberTotal: response.total,
      loading: false,
      error: null
    })
    .set('memberData', { ...state.memberData, ...formattedObjectData });
};

const getMemberListFailure = (state, { error }) =>
  state.merge({ loading: false, error: error });

const updatePage = (state, { page }) =>
  state.merge({
    memberPage: page
  });

const logout = state => INITIAL_STATE;

const ACTION_HANDLERS = {
  [MemberTypes.GET_MEMBER_LIST]: getMemberList,
  [MemberTypes.GET_MEMBER_LIST_SUCCESS]: getMemberListSuccess,
  [MemberTypes.GET_MEMBER_LIST_FAILURE]: getMemberListFailure,
  [MemberTypes.UPDATE_PAGE]: updatePage,
  [LoginTypes.LOGOUT]: logout
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
