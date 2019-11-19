import { createSelector } from 'reselect';
import _ from 'lodash';

const getMemberData = (state, props) => state.member.memberData;
const getMemberIds = (state, props) => state.member.memberIds;

export const getMemberListSelector = createSelector(
  [getMemberData, getMemberIds],
  (data, ids) => _.map(ids, id => data[id])
);
