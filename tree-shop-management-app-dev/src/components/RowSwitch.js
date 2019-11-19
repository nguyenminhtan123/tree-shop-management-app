import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/rnstandard';
import { Colors } from '../themes';
import { Text } from './index';

const RowSwitch = props => {
  const {
    onValueChange,
    containerStyle,
    textStyle,
    switchColor,
    rowTitle,
    valueSwitch,
    icon,
    iconSize,
    iconColor
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      {icon && (
        <Icon
          name={icon}
          size={iconSize || 20}
          color={Colors.black || iconColor}
          style={{ marginLeft: 12 }}
        />
      )}
      <Text type="regular" style={[styles.textTitle, textStyle]}>
        {rowTitle}
      </Text>
      <Switch
        value={valueSwitch}
        onValueChange={onValueChange}
        trackColor={{ true: switchColor, false: null }}
      />
    </View>
  );
};

RowSwitch.propTypes = {
  onValueChange: PropTypes.func,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  rowTitle: PropTypes.string,
  valueSwitch: PropTypes.bool,
  switchColor: PropTypes.string,
  iconColor: PropTypes.string,
  icon: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.divider,
    paddingRight: 12
  },
  textTitle: {
    flex: 1,
    paddingLeft: 12
  }
});

export default RowSwitch;
