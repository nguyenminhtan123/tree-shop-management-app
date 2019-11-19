import Immutable from 'seamless-immutable';
import { FetchCategoryTypes } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';
import { convertArrayToObject } from '../../utils/functions';
import { uniq } from 'lodash';

export const INITIAL_STATE = Immutable({
  data: {},
  error: null,
  fetchCategoryLoading: false
});

const fetchCategory = state =>
  state.merge({
    fetchCategoryLoading: true
  });

const fetchCategorySuccess = (state, { response }) => {
  const formattedObjectData = convertArrayToObject(response, 'id');

  return state
    .merge({
      fetchCategoryLoading: false,
      error: null
    })
    .set('data', { ...state.data, ...formattedObjectData });
};
// state.merge({
//   data: response,
//   fetchCategoryLoading: false
// });

const fetchCategoryFailure = (state, { error }) =>
  state.merge({
    error: error,
    fetchCategoryLoading: false
  });

const ACTION_HANDLERS = {
  [FetchCategoryTypes.FETCH_CATEGORY]: fetchCategory,
  [FetchCategoryTypes.FETCH_CATEGORY_SUCCESS]: fetchCategorySuccess,
  [FetchCategoryTypes.FETCH_CATEGORY_FAILURE]: fetchCategoryFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
