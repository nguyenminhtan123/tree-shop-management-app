import Immutable from 'seamless-immutable';
import { uniq } from 'lodash';
import { CartTypes } from './actions';
import { convertArrayToObject } from '../../utils/functions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  cart: [],
  order: [],
  error: null,
  addToCartLoading: false,
  //fetchProductsInCartLoading: false,
  changeQuantityLoading: false,
  orderLoading: false,

  cartMemberData: {},
  cartMemberIds: [],
  cartMemberPage: 0,
  cartMemberTotal: 0,
  loading: false,
  error: null,

  delete: {},
  deleteLoading: false,
  deleteAllLoading: false
});

const addToCart = (state, { data }) =>
  state.merge({
    addToCartLoading: true
  });

const addToCartSuccess = (state, { response }) => {
  const formattedObjectData = state.cartMemberData.merge(
    convertArrayToObject(response.data, 'prodId')
  );

  return state
    .merge({
      cartMemberIds: uniq([
        ...state.cartMemberIds,
        ...response.data.map(e => e.prodId)
      ]),
      cartMemberTotal: response.total,
      addToCartLoading: false,
      error: null
    })
    .set('cartMemberData', { ...state.cartMemberData, ...formattedObjectData });
};

const addToCartFailure = (state, { error }) =>
  state.merge({
    error: error,
    addToCartLoading: false
  });

const plusQuantity = (state, { data }) =>
  state.merge({
    changeQuantityLoading: true
  });

const plusQuantitySuccess = (state, { response }) => {
  const { productId, data } = response;
  return state
    .merge({
      changeQuantityLoading: false
    })
    .updateIn(
      ['cartMemberData', productId, 'quantity'],
      (oldValue, newValue) => newValue,
      data && data.quantity
    );
};
// state.merge({
//   cartMemberData: response,
//   changeQuantityLoading: false
// });

const plusQuantityFailure = (state, { error }) =>
  state.merge({
    error: error,
    changeQuantityLoading: false
  });

const minusQuantity = (state, { data }) =>
  state.merge({
    changeQuantityLoading: true
  });

const minusQuantitySuccess = (state, { response }) => {
  const { productId, data } = response;
  return state
    .merge({
      changeQuantityLoading: false
    })
    .updateIn(
      ['cartMemberData', productId, 'quantity'],
      (oldValue, newValue) => newValue,
      data && data.quantity
    );
};

const minusQuantityFailure = (state, { error }) =>
  state.merge({
    error: error,
    changeQuantityLoading: false
  });

const order = (state, { data }) =>
  state.merge({
    orderLoading: true
  });

const orderSuccess = (state, { response }) =>
  state.merge({
    order: response,
    orderLoading: false,
    cartMemberData: {},
    cartMemberIds: [],
    cartMemberPage: 0,
    cartMemberTotal: 0
  });

const orderFailure = (state, { error }) =>
  state.merge({
    error: error,
    orderLoading: false
  });

const getCartList = (state, { isNextPage }) =>
  state.merge({
    loading: true,
    error: null
  });

const getCartListSuccess = (state, { response }) => {
  const formattedObjectData = state.cartMemberData.merge(
    convertArrayToObject(response.data, 'prodId')
  );

  return state
    .merge({
      cartMemberIds: uniq([
        ...state.cartMemberIds,
        ...response.data.map(e => e.prodId)
      ]),
      cartMemberTotal: response.total,
      loading: false,
      error: null
    })
    .set('cartMemberData', { ...state.cartMemberData, ...formattedObjectData });
};

const getCartListFailure = (state, { error }) =>
  state.merge({ loading: false, error: error });

const updatePage = (state, { page }) =>
  state.merge({
    cartMemberPage: page
  });

const deleteProduct = (state, { data }) =>
  state.merge({
    deleteLoading: true
  });

const deleteProductSuccess = (state, { response }) => {
  const newData = state.cartMemberData.without([response]);
  const newIds = uniq(
    state.cartMemberIds.filter(cartMemberId => cartMemberId !== response)
  );
  const newTotal = newIds.length;

  return state
    .merge({
      cartMemberIds: newIds,
      deleteLoading: false,
      error: null,
      cartMemberTotal: newTotal
    })
    .set('cartMemberData', newData);
};

const deleteProductFailure = (state, { error }) =>
  state.merge({
    error: error,
    deleteLoading: false
  });

const deleteAllProduct = (state, { data }) =>
  state.merge({
    deleteAllLoading: true
  });

const deleteAllProductSuccess = (state, { response }) =>
  state.merge({
    deleteAllLoading: false,
    cartMemberData: {},
    cartMemberIds: [],
    cartMemberPage: 0,
    cartMemberTotal: 0
  });

const deleteAllProductFailure = (state, { error }) =>
  state.merge({
    error: error,
    deleteAllLoading: false
  });

const ACTION_HANDLERS = {
  [CartTypes.ADD_TO_CART]: addToCart,
  [CartTypes.ADD_TO_CART_SUCCESS]: addToCartSuccess,
  [CartTypes.ADD_TO_CART_FAILURE]: addToCartFailure,

  [CartTypes.PLUS_QUANTITY]: plusQuantity,
  [CartTypes.PLUS_QUANTITY_SUCCESS]: plusQuantitySuccess,
  [CartTypes.PLUS_QUANTITY_FAILURE]: plusQuantityFailure,

  [CartTypes.MINUS_QUANTITY]: minusQuantity,
  [CartTypes.MINUS_QUANTITY_SUCCESS]: minusQuantitySuccess,
  [CartTypes.MINUS_QUANTITY_FAILURE]: minusQuantityFailure,

  [CartTypes.ORDER]: order,
  [CartTypes.ORDER_SUCCESS]: orderSuccess,
  [CartTypes.ORDER_FAILURE]: orderFailure,

  [CartTypes.GET_CART_LIST]: getCartList,
  [CartTypes.GET_CART_LIST_SUCCESS]: getCartListSuccess,
  [CartTypes.GET_CART_LIST_FAILURE]: getCartListFailure,
  [CartTypes.UPDATE_PAGE]: updatePage,

  [CartTypes.DELETE_PRODUCT]: deleteProduct,
  [CartTypes.DELETE_PRODUCT_SUCCESS]: deleteProductSuccess,
  [CartTypes.DELETE_PRODUCT_FAILURE]: deleteProductFailure,

  [CartTypes.DELETE_ALL_PRODUCT]: deleteAllProduct,
  [CartTypes.DELETE_ALL_PRODUCT_SUCCESS]: deleteAllProductSuccess,
  [CartTypes.DELETE_ALL_PRODUCT_FAILURE]: deleteAllProductFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
