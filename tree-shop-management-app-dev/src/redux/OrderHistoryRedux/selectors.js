import { createSelector } from 'reselect';
import _ from 'lodash';

const getOrderHistoryMemberData = (state, props) =>
  state.orderHistory.orderHistoryMemberData;

export const getOrderHistoryListSelector = createSelector(
  [getOrderHistoryMemberData],
  OrderHistoryMemberData => {
    var convertData = Object.keys(
      _.zipObject(
        Object.keys(OrderHistoryMemberData),
        Object.values(OrderHistoryMemberData)
      )
    ).map(function(key) {
      return [
        Number(key),
        _.zipObject(
          Object.keys(OrderHistoryMemberData),
          Object.values(OrderHistoryMemberData)
        )[key]
      ];
    });
    console.log('====================================');
    console.log(convertData);
    console.log(getOrderHistoryMemberData);
    console.log(OrderHistoryMemberData);
    console.log('====================================');
    return (newData = convertData.map(function(x) {
      return {
        title: x[0],
        data: x[1]
      };
    }));
  }
);
