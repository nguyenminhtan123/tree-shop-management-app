import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const standardWidth = 375;
const standardHeight = 667;

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  ratioH: height / standardHeight,
  ratioW: width / standardWidth
};

export default metrics;
