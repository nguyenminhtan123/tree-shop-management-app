import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// import your screens here
import ListProduct from '../screens/ListProduct';

import Intro from '../screens/Intro';
import SideMenu from '../screens/SideMenu';
import Login from '../screens/Authentication/Login';
import ForgotPassword from '../screens/Authentication/ForgotPassword';
import ConfirmCode from '../screens/Authentication/ConfirmCode';
import ResetPassword from '../screens/Authentication/ResetPassword';
import SignUp from '../screens/Authentication/Signup';
import ProductDetail from '../screens/Product/ProductDetail';
import Cart from '../screens/Cart/Cart';
import ListOrderHistory from '../screens/OrderHistory/ListOrderHistory';
import OrderHistoryDetail from '../screens/OrderHistory/OrderHistoryDetail';

import UserProfile from '../screens/User/UserProfile';
import ChangePassword from '../screens/User/ChangePassword';

// import your components here
import {
  ConfirmAlert,
  Feedback,
  DatePicker,
  InAppNotification
} from '../components/Overlay';

export function registerScreens(store, persistor) {
  const PersistProvider = props => {
    const { children } = props;
    return (
      <Provider {...props}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  };

  // screens
  Navigation.registerComponentWithRedux(
    'app.listProduct',
    () => ListProduct,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.intro',
    () => Intro,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.sidemenu',
    () => SideMenu,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.login',
    () => Login,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.forgotpassword',
    () => ForgotPassword,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.confirmcode',
    () => ConfirmCode,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.resetPassword',
    () => ResetPassword,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.signup',
    () => SignUp,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.productDetail',
    () => ProductDetail,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.cart',
    () => Cart,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.listOrderHistory',
    () => ListOrderHistory,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.orderHistoryDetail',
    () => OrderHistoryDetail,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.userProfile',
    () => UserProfile,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.changePassword',
    () => ChangePassword,
    PersistProvider,
    store
  );

  // components
  Navigation.registerComponent(
    'overlay.confirmAlert',
    () => ConfirmAlert,
    () => ConfirmAlert,
    PersistProvider,
    store
  );

  Navigation.registerComponent(
    'overlay.feedback',
    () => Feedback,
    () => Feedback,
    PersistProvider,
    store
  );

  Navigation.registerComponent(
    'overlay.datePicker',
    () => DatePicker,
    () => DatePicker,
    Provider,
    store
  );

  Navigation.registerComponent(
    'overlay.inAppNotification',
    () => InAppNotification,
    () => InAppNotification,
    PersistProvider,
    store
  );
}
