import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator
} from 'redux-persist-seamless-immutable';

const APP_CONFIG = {
  SERVER_URL: Config.SERVER_URL
};

const transformerConfig = {
  whitelistPerReducer: {
    login: ['data', 'token'],
    listCategory: ['data'],
    userProfile: ['data'],
    orderHistory: ['data'],
    addToCart: ['data'],
    member: ['data'],
    product: ['data']
  },
  blacklistPerReducer: {}
};

export const REDUX_PERSIST = {
  key: 'root',
  timeout: null,
  storage: AsyncStorage,
  version: 1,
  blacklist: [],
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)]
};

export default APP_CONFIG;
