import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const FetchCategoryTypes = makeConstantCreator(
  'FETCH_CATEGORY',
  'FETCH_CATEGORY_SUCCESS',
  'FETCH_CATEGORY_FAILURE'
);

const fetchCategory = sort =>
  makeActionCreator(FetchCategoryTypes.FETCH_CATEGORY, { sort });
const fetchCategorySuccess = response =>
  makeActionCreator(FetchCategoryTypes.FETCH_CATEGORY_SUCCESS, { response });
const fetchCategoryFailure = error =>
  makeActionCreator(FetchCategoryTypes.FETCH_CATEGORY_FAILURE, { error });

export default {
  fetchCategory,
  fetchCategorySuccess,
  fetchCategoryFailure
};
