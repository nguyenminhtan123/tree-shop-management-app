import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Touchable } from './index';
import { Colors } from '../themes';

export default class TouchableButton extends React.PureComponent {
  onPress = () => {
    const { onPress } = this.props;
    onPress && onPress();
  };

  render() {
    const {
      title,
      textStyle,
      buttonColor,
      style,
      isDisabled,
      isOutlineMode,
      loading
    } = this.props;

    let buttonStyle;
    let titleColor;

    if (isOutlineMode) {
      buttonStyle = {
        backgroundColor: Colors.transparent,
        borderColor: buttonColor,
        borderWidth: StyleSheet.hairlineWidth
      };
      titleColor = buttonColor;
    } else {
      buttonStyle = {
        backgroundColor: buttonColor
      };
      titleColor = Colors.white;
    }

    return (
      <Touchable
        onPress={this.onPress}
        disabled={isDisabled || loading ? true : false}
      >
        <View style={[styles.buttonContainer, buttonStyle, style]}>
          {loading ? (
            <ActivityIndicator size="small" color={titleColor} />
          ) : (
            <Text
              type="bold"
              color={titleColor}
              sizeType="xMedium"
              center
              numberOfLines={1}
              style={textStyle}
            >
              {title}
            </Text>
          )}
        </View>
      </Touchable>
    );
  }
}

TouchableButton.defaultProps = {
  textStyle: {},
  style: {},
  isDisabled: false,
  isOutlineMode: false,
  loading: false
};

TouchableButton.propTypes = {
  title: PropTypes.string.isRequired,
  textStyle: PropTypes.any,
  buttonColor: PropTypes.string,
  style: PropTypes.any,
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  isOutlineMode: PropTypes.bool,
  loading: PropTypes.bool
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  }
});
