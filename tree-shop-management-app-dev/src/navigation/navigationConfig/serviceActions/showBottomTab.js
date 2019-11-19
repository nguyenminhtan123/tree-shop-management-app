import { Navigation } from 'react-native-navigation';
import { component, stack, sideMenu } from '../layoutTypes';
import { iconsMap } from '../../../utils/appIcons';

export const showBottomTab = (screen1, screen2, screen3) => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: screen1,
                    passProps: {
                      text: 'This is tab 1'
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  text: 'Home',
                  icon: iconsMap['ic-home'],
                  testID: 'FIRST_TAB_BAR_BUTTON'
                }
              }
            }
          },
          {
            component: {
              name: screen2,
              passProps: {
                text: 'This is tab 2'
              },
              options: {
                bottomTab: {
                  text: 'Cart',
                  icon: iconsMap['ios-cart'],
                  testID: 'SECOND_TAB_BAR_BUTTON'
                }
              }
            }
          },
          {
            component: {
              name: screen3,
              passProps: {
                text: 'This is tab 3'
              },
              options: {
                bottomTab: {
                  text: 'Profile',
                  icon: iconsMap['ic-user'],
                  testID: 'THIRD_TAB_BAR_BUTTON'
                }
              }
            }
          }
        ]
      }
    }
  });
};
