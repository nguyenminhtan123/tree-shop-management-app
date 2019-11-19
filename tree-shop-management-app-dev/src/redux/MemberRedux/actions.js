import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const MemberTypes = makeConstantCreator(
  'GET_MEMBER_LIST',
  'GET_MEMBER_LIST_SUCCESS',
  'GET_MEMBER_LIST_FAILURE',
  'UPDATE_PAGE'
);

const getMemberList = isNextPage =>
  makeActionCreator(MemberTypes.GET_MEMBER_LIST, { isNextPage });

const getMemberListSuccess = response =>
  makeActionCreator(MemberTypes.GET_MEMBER_LIST_SUCCESS, { response });

const getMemberListFailure = error =>
  makeActionCreator(MemberTypes.GET_MEMBER_LIST_FAILURE, { error });

const updatePage = page => makeActionCreator(MemberTypes.UPDATE_PAGE, { page });

export default {
  getMemberList,
  getMemberListSuccess,
  getMemberListFailure,
  updatePage
};
