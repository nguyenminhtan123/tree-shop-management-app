import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const FetchProductTypes = makeConstantCreator(
  'FETCH_PRODUCT',
  'FETCH_PRODUCT_SUCCESS',
  'FETCH_PRODUCT_FAILURE'
);

const fetchProduct = sort =>
  makeActionCreator(FetchProductTypes.FETCH_PRODUCT, { sort });
const fetchProductSuccess = response =>
  makeActionCreator(FetchProductTypes.FETCH_PRODUCT_SUCCESS, { response });
const fetchProductFailure = error =>
  makeActionCreator(FetchProductTypes.FETCH_PRODUCT_FAILURE, { error });

export default {
  fetchProduct,
  fetchProductSuccess,
  fetchProductFailure
};
