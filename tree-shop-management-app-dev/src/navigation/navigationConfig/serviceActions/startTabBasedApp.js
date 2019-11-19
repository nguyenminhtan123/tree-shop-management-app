import { Navigation } from 'react-native-navigation';
import { component, stack, bottomTabs, sideMenu } from '../layoutTypes';
import { iconsMap } from '../../../utils/appIcons';

export const startTabBasedApp = listTabs => {
  const newListTabs = listTabs.map(item => {
    return stack(
      component(item.componentName, item.passProps, {
        bottomTab: {
          text: item.tabName,
          icon: iconsMap[item.tabIcon]
        }
      })
    );
  });
  Navigation.setRoot({
    root: bottomTabs(newListTabs)
  });
};
