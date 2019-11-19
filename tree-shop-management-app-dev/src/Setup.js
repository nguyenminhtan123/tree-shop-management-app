import React from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './navigation/registeredScreens';
import { iconsLoaded } from './utils/appIcons';
import configureStore from './redux/store';
import { onNavigationEvent } from './navigation/navigationConfig/serviceActions/handleNavigationButtonPressed';
import AppActions from './redux/AppRedux/actions';
import { setDefaultOptions } from './navigation/navigationConfig/defaultStyleOptions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.startApp();
  }

  loadStore = async () => {
    return new Promise(resolve => {
      configureStore((store, persistor) => {
        registerScreens(store, persistor);
        resolve(store, persistor);
      });
    });
  };

  loadIntial = () => {
    return Promise.all([this.loadStore(), iconsLoaded])
      .then(response => {
        const store = response[0];
        const { token } = store.getState().login;
        global.token = token;
        store.dispatch(AppActions.startup());
      })
      .catch(err => {
        console.log(err);
      });
  };

  startApp = () => {
    Navigation.events().registerAppLaunchedListener(() => {
      setDefaultOptions();
      this.loadIntial();
    });
    Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId, componentId }) => {
        onNavigationEvent(buttonId, componentId);
      }
    );
  };
}

export default App;
