import { Navigation } from 'react-native-navigation';
import { component, stack, sideMenu } from '../layoutTypes';
import { iconsMap } from '../../../utils/appIcons';

export const startSingleApp = (screen, hasSideMenu = false) => {
  if (hasSideMenu) {
    Navigation.setRoot({
      root: stack(component(screen))
    });
  } else {
    Navigation.setRoot({
      root: stack(component(screen))
    });
  }
};
