import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import { stack, component } from '../layoutTypes';

const MODAL_STYLE = {
  ios: 'overFullScreen',
  android: 'overCurrentContext'
};

export const showModal = (screen, passProps, options, isStackScreen = true) => {
  const defaultOptions = {
    modalPresentationStyle: isStackScreen
      ? undefined
      : MODAL_STYLE[Platform.OS],
    topBar: {
      visible: false,
      drawBehind: true
    }
  };

  Navigation.showModal(
    isStackScreen
      ? stack(component(screen, passProps, { ...defaultOptions, ...options }))
      : component(screen, passProps, { ...defaultOptions, ...options })
  );
};
