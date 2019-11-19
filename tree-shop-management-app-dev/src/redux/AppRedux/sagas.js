import { takeLatest, select } from 'redux-saga/effects';
import { AppTypes } from '../AppRedux/actions';
import {
  startSingleApp,
  startTabBasedApp
} from '../../navigation/navigationConfig/serviceActions';

export function* startup() {
  try {
    const { token } = yield select(state => state.login);
    const listTabs = [
      {
        componentName: 'app.listProduct',
        passProps: {},
        tabName: 'Home',
        tabIcon: 'ic-home'
      },
      {
        componentName: 'app.listOrderHistory',
        passProps: {},
        tabName: 'Order History',
        tabIcon: 'ios-today'
      },
      {
        componentName: 'app.sidemenu',
        passProps: {},
        tabName: 'Profile',
        tabIcon: 'ic-user'
      }
    ];

    !token
      ? startSingleApp(
          'app.intro',
          {},
          {
            topBar: {
              visible: false,
              drawBehind: true
            }
          },
          false
        )
      : startTabBasedApp(listTabs);
  } catch (error) {}
}

const appSagas = () => [takeLatest(AppTypes.STARTUP, startup)];

export default appSagas();
