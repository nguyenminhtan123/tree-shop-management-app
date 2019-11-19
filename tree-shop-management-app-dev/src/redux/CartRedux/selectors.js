import { createSelector } from 'reselect';
import _ from 'lodash';

const getCartMemberData = (state, props) => state.addToCart.cartMemberData;
const getCartMemberIds = (state, props) => state.addToCart.cartMemberIds;

export const getCartMemberListSelector = createSelector(
  [getCartMemberData, getCartMemberIds],
  (data, ids) => _.map(ids, id => data[id])
);
