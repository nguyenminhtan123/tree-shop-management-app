import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const CartTypes = makeConstantCreator(
  'ADD_TO_CART',
  'ADD_TO_CART_SUCCESS',
  'ADD_TO_CART_FAILURE',

  'GET_CART_LIST',
  'GET_CART_LIST_SUCCESS',
  'GET_CART_LIST_FAILURE',
  'UPDATE_PAGE',

  'PLUS_QUANTITY',
  'PLUS_QUANTITY_SUCCESS',
  'PLUS_QUANTITY_FAILURE',

  'MINUS_QUANTITY',
  'MINUS_QUANTITY_SUCCESS',
  'MINUS_QUANTITY_FAILURE',

  'ORDER',
  'ORDER_SUCCESS',
  'ORDER_FAILURE',

  'DELETE_PRODUCT',
  'DELETE_PRODUCT_SUCCESS',
  'DELETE_PRODUCT_FAILURE',

  'DELETE_ALL_PRODUCT',
  'DELETE_ALL_PRODUCT_SUCCESS',
  'DELETE_ALL_PRODUCT_FAILURE'
);

const addToCart = data => makeActionCreator(CartTypes.ADD_TO_CART, { data });
const addToCartSuccess = response =>
  makeActionCreator(CartTypes.ADD_TO_CART_SUCCESS, { response });
const addToCartFailure = error =>
  makeActionCreator(CartTypes.ADD_TO_CART_FAILURE, { error });

//new fetch cart
const getCartList = isNextPage =>
  makeActionCreator(CartTypes.GET_CART_LIST, { isNextPage });

const getCartListSuccess = response =>
  makeActionCreator(CartTypes.GET_CART_LIST_SUCCESS, { response });

const getCartListFailure = error =>
  makeActionCreator(CartTypes.GET_CART_LIST_FAILURE, { error });

const updatePage = page => makeActionCreator(CartTypes.UPDATE_PAGE, { page });
//new fetch cart

const plusQuantity = data =>
  makeActionCreator(CartTypes.PLUS_QUANTITY, { data });
const plusQuantitySuccess = response =>
  makeActionCreator(CartTypes.PLUS_QUANTITY_SUCCESS, { response });
const plusQuantityFailure = error =>
  makeActionCreator(CartTypes.PLUS_QUANTITY_FAILURE, { error });

const minusQuantity = data =>
  makeActionCreator(CartTypes.MINUS_QUANTITY, { data });
const minusQuantitySuccess = response =>
  makeActionCreator(CartTypes.MINUS_QUANTITY_SUCCESS, { response });
const minusQuantityFailure = error =>
  makeActionCreator(CartTypes.MINUS_QUANTITY_FAILURE, { error });

const order = data => makeActionCreator(CartTypes.ORDER, { data });
const orderSuccess = response =>
  makeActionCreator(CartTypes.ORDER_SUCCESS, { response });
const orderFailure = error =>
  makeActionCreator(CartTypes.ORDER_FAILURE, { error });

const deleteProduct = data =>
  makeActionCreator(CartTypes.DELETE_PRODUCT, { data });
const deleteProductSuccess = response =>
  makeActionCreator(CartTypes.DELETE_PRODUCT_SUCCESS, { response });
const deleteProductFailure = error =>
  makeActionCreator(CartTypes.DELETE_PRODUCT_FAILURE, { error });

const deleteAllProduct = data =>
  makeActionCreator(CartTypes.DELETE_ALL_PRODUCT, { data });
const deleteAllProductSuccess = response =>
  makeActionCreator(CartTypes.DELETE_ALL_PRODUCT_SUCCESS, { response });
const deleteAllProductFailure = error =>
  makeActionCreator(CartTypes.DELETE_ALL_PRODUCT_FAILURE, { error });

export default {
  addToCart,
  addToCartSuccess,
  addToCartFailure,
  plusQuantity,
  plusQuantitySuccess,
  plusQuantityFailure,
  minusQuantity,
  minusQuantitySuccess,
  minusQuantityFailure,
  order,
  orderSuccess,
  orderFailure,
  getCartList,
  getCartListSuccess,
  getCartListFailure,
  updatePage,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
  deleteAllProduct,
  deleteAllProductSuccess,
  deleteAllProductFailure
};
