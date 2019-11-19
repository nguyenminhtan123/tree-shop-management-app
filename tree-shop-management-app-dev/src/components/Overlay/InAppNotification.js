import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Vibration,
  Platform
} from 'react-native';
import { Text } from '../index';
import { Metrics, Colors } from '../../themes';
import { dismissOverlay } from '../../navigation/navigationConfig/serviceActions';

export default class NotificationOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    const { onDisplay, componentId } = this.props;
    this.toggleNotificationAnim();
    onDisplay(componentId);
  }

  toggleNotificationAnim = (isShow = true) => {
    const {
      autoDismissTime,
      isAutoDismiss,
      componentId,
      isVibrate
    } = this.props;
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 700,
      easing: Easing.poly(0.8),
      useNativeDriver: true
    }).start(() => {
      if (!isShow) {
        dismissOverlay(componentId);
      } else {
        if (isVibrate) {
          Platform.OS === 'ios'
            ? Vibration.vibrate()
            : Vibration.vibrate([0, 500]);
        }
        isAutoDismiss &&
          setTimeout(() => {
            this.toggleNotificationAnim(false);
          }, autoDismissTime);
      }
    });
  };

  render() {
    const { title, content, type, titleStyle, contentStyle } = this.props;
    return (
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: this.animation.interpolate({
                  inputRange: [0, 0.3, 1],
                  outputRange: [-70, 5, 0]
                })
              }
            ],
            backgroundColor: Colors[type]
          },
          styles.animatedView
        ]}
      >
        <View style={styles.container}>
          {title && (
            <Text
              color={Colors.white}
              type="bold"
              center
              sizeType="xMedium"
              style={titleStyle}
            >
              {title}
            </Text>
          )}
          {content && (
            <Text
              color={Colors.white}
              type="medium"
              center
              sizeType="medium"
              style={contentStyle}
            >
              {content}
            </Text>
          )}
        </View>
      </Animated.View>
    );
  }
}

NotificationOverlay.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  titleStyle: PropTypes.any,
  contentStyle: PropTypes.any,
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
  autoDismissTime: PropTypes.number,
  isAutoDismiss: PropTypes.bool,
  isVibrate: PropTypes.bool,
  componentId: PropTypes.string,
  onDisplay: PropTypes.func
};

NotificationOverlay.defaultProps = {
  autoDismissTime: 1500,
  isAutoDismiss: true,
  isVibrate: true,
  type: 'info',
  titleStyle: {
    paddingVertical: 8
  }
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16
  },
  animatedView: {
    width: Metrics.screenWidth
  }
});
