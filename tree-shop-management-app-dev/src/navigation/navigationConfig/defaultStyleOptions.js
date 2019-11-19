import { Navigation } from 'react-native-navigation';
import { Colors, Metrics } from '../../themes';
import { iconsMap } from '../../utils/appIcons';

export const setDefaultOptions = () =>
  Navigation.setDefaultOptions({
    layout: {
      componentBackgroundColor: Colors.white,
      orientation: ['portrait'],
      backgroundColor: Colors.white
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
      backgroundColor: Colors.white
    },
    bottomTab: {
      iconInsets: { top: 0, left: 0, bottom: 0, right: 0 },
      iconColor: Colors.black,
      selectedIconColor: Colors.primary,
      textColor: Colors.black,
      selectedTextColor: Colors.primary,
      fontFamily: 'Roboto-Bold'
    },
    sideMenu: {
      left: {
        width: 280 * Metrics.ratioW
      },
      right: {
        width: 280 * Metrics.ratioW
      }
    },
    topBar: {
      visible: true,
      drawBehind: false,
      title: {
        alignment: 'center',
        fontSize: 18,
        color: Colors.white,
        fontFamily: 'Roboto-Medium'
      },
      background: {
        color: Colors.primary
      },
      animate: true,
      elevation: 10,
      noBorder: false
    }
  });
