import Icon from 'react-native-vector-icons/rnstandard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes';
import colors from '../themes/Colors';

const replaceSuffixPattern = /--(active|big|small|very-big)/g;

const icons = {
  'ic-home': [22, Colors.black],
  'ic-user': [22, Colors.black],
  'ic-back': [22, Colors.white],
  'ic-close': [22, Colors.white],
  'ic-setting': [22, Colors.black],
  'ic-drawer': [22, Colors.black],
  'ios-cart': [22, Colors.black, 'ionIcons'],
  'ic-search': [22, Colors.white],
  'ios-trash': [25, Colors.white, 'ionIcons'],
  'ios-pricetags': [10, Colors.darkGray, 'ionIcons'],
  'ios-leaf': [10, Colors.darkGray, 'ionIcons'],
  'ios-today': [10, Colors.white, 'ionIcons'],
  'ios-create': [25, Colors.white, 'ionIcons']
};

const iconsMap = {};

const iconsLoaded = new Promise(resolve => {
  new Promise.all(
    Object.keys(icons).map(iconName => {
      switch (icons[iconName][2]) {
        case 'fontAwesome':
          return FontAwesome.getImageSource(
            iconName.replace(replaceSuffixPattern, ''),
            icons[iconName][0],
            icons[iconName][1]
          );
        case 'ionIcons':
          return IonIcons.getImageSource(
            iconName.replace(replaceSuffixPattern, ''),
            icons[iconName][0],
            icons[iconName][1]
          );
        default:
          return Icon.getImageSource(
            iconName.replace(replaceSuffixPattern, ''),
            icons[iconName][0],
            icons[iconName][1]
          );
      }
    })
  )
    .then(sources => {
      Object.keys(icons).forEach((iconName, idx) => {
        iconsMap[iconName] = sources[idx];
      });

      // Call resolve (and we are done)
      resolve(true);
    })
    .catch(err => {
      console.log(err);
    });
});

export { iconsMap, iconsLoaded };
