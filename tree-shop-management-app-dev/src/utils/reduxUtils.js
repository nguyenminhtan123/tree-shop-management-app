import _ from 'lodash';

export function makeConstantCreator(...params) {
  const constant = {};
  _.each(params, param => {
    constant[param] = param;
  });
  return constant;
}

export const makeActionCreator = (type, params = null) => ({ type, ...params });

export const makeReducerCreator = (initialState = null, handlers = {}) => (
  state = initialState,
  action
) => {
  if (!action && !action.type) return state;
  const handler = handlers[action.type];
  return (handler && handler(state, action)) || state;
};
