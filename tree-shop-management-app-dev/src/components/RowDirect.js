import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/rnstandard';
import { Colors } from '../themes';
import { Text, Touchable } from './index';

const RowDirect = props => {
  const {
    badge,
    icon,
    ionIcons,
    fontAwesomeIcons,
    iconSize,
    iconColor,
    rowTitle,
    containerStyle,
    textStyle
  } = props;

  onPress = () => {
    const { onPress, rowTitle } = props;
    onPress(rowTitle);
  };

  return (
    <Touchable onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        {icon && (
          <Icon
            name={icon}
            size={iconSize || 20}
            color={Colors.black || iconColor}
            style={{ marginLeft: 12 }}
          />
        )}
        {ionIcons && (
          <IonIcons
            name={ionIcons}
            size={iconSize || 20}
            color={Colors.black || iconColor}
            style={{ marginLeft: 12 }}
          />
        )}
        {fontAwesomeIcons && (
          <FontAwesome
            name={fontAwesomeIcons}
            size={iconSize || 20}
            color={Colors.black || iconColor}
            style={{ marginLeft: 12 }}
          />
        )}
        <Text type="regular" style={[styles.titleStyle, textStyle]}>
          {rowTitle}
        </Text>
        {badge && (
          <View style={styles.badgeContainer}>
            <Text type="medium" sizeType="small" color={Colors.white} center>
              {badge}
            </Text>
          </View>
        )}
        <Icon
          name="ic-next"
          size={12}
          color={Colors.black}
          style={styles.iconDirect}
        />
      </View>
    </Touchable>
  );
};

RowDirect.propTypes = {
  onPress: PropTypes.func,
  badge: PropTypes.string,
  icon: PropTypes.string,
  ionIcons: PropTypes.string,
  fontAwesomeIcons: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  rowTitle: PropTypes.string,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object
};

RowDirect.defaultProps = {
  onPress: () => {},
  containerStyle: {},
  textStyle: {}
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.divider
  },
  iconDirect: {
    marginRight: 10
  },
  titleStyle: {
    flex: 1,
    paddingLeft: 12
  },
  badgeContainer: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: 'red',
    borderRadius: 15,
    marginRight: 4
  }
});

export default RowDirect;
