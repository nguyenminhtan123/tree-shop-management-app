import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { component } from '../layoutTypes';
import { iconsMap } from '../../../utils/appIcons';
import { Colors } from '../../../themes';

export const pushScreen = (
  componentId,
  screenApp,
  passProps,
  options,
  keepBottomTab = false
) => {
  const defaultOptions = {
    topBar: {
      visible: true,
      ...Platform.select({ android: { drawBehind: false } }),
      title: {
        text: options.topBarTitle
      },
      leftButtons: options.leftButtons,
      rightButtons: options.rightButtons,
      backButton: {
        icon: iconsMap['ic-back'],
        visible: true,
        color: Colors.white
      }
    },
    bottomTabs: {
      visible: keepBottomTab,
      ...Platform.select({ android: { drawBehind: !keepBottomTab } })
    }
  };

  Navigation.push(
    componentId,
    component(screenApp, passProps, { ...defaultOptions, ...options })
  );
};
