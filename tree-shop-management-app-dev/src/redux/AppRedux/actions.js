import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const AppTypes = makeConstantCreator(
  'STARTUP',
  'CHANGE_NETWORK_STATUS',
  'CHANGE_LANGUAGE'
);

const startup = () => makeActionCreator(AppTypes.STARTUP);

const changeNetworkStatus = status =>
  makeActionCreator(AppTypes.CHANGE_NETWORK_STATUS, { status });

const changeLanguage = language =>
  makeActionCreator(AppTypes.CHANGE_LANGUAGE, { language });

export default {
  startup,
  changeNetworkStatus,
  changeLanguage
};
