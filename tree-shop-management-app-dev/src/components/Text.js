import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text as RNText } from 'react-native';
import { Fonts, Colors } from '../themes';

const Text = props => {
  const {
    type,
    color,
    center,
    size,
    sizeType,
    underline,
    style,
    children
  } = props;
  return (
    <RNText
      {...props}
      style={[
        type && { fontFamily: Fonts.fontFamily[type] },
        color && { color },
        size && { fontSize: size },
        sizeType && { fontSize: Fonts.fontSize[sizeType] },
        center && styles.center,
        underline && styles.txtUnderline,
        style
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  center: {
    textAlign: 'center'
  },
  txtUnderline: {
    textDecorationLine: 'underline'
  }
});

Text.propTypes = {
  type: PropTypes.string,
  sizeType: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  center: PropTypes.bool,
  underLine: PropTypes.bool,
  style: PropTypes.any,
  children: PropTypes.any
};

Text.defaultProps = {
  type: 'light',
  sizeType: 'medium',
  color: Colors.black,
  center: false,
  underLine: false,
  style: {}
};

export default Text;
