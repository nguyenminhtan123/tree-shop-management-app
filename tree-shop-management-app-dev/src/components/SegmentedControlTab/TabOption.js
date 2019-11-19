import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes
} from 'react-native';

import { Text } from '../../components';
import { Colors } from '../../themes';

export default class TabOption extends PureComponent {
  render() {
    const {
      isTabActive,
      index,
      badge,
      text,
      firstTabStyle,
      lastTabStyle,
      tabStyle,
      activeTabStyle,
      tabTextStyle,
      activeTabTextStyle,
      tabBadgeContainerStyle,
      activeTabBadgeContainerStyle,
      tabBadgeStyle,
      activeTabBadgeStyle,
      onTabPress,
      textNumberOfLines,
      allowFontScaling,
      accessible,
      activeTabOpacity,
      accessibilityLabel,
      enabled
    } = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.tabStyle,
          tabStyle,
          isTabActive ? [styles.activeTabStyle, activeTabStyle] : {},
          firstTabStyle,
          lastTabStyle
        ]}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={isTabActive ? 'selected' : 'button'}
        accessibilityComponentType="button"
        onPress={() => onTabPress(index)}
        disabled={!enabled}
        activeOpacity={activeTabOpacity}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text
            type="medium"
            sizeType="xMedium"
            style={[
              styles.tabTextStyle,
              tabTextStyle,
              isTabActive ? [styles.activeTabTextStyle, activeTabTextStyle] : {}
            ]}
            numberOfLines={textNumberOfLines}
            allowFontScaling={allowFontScaling}
            ellipsizeMode="tail"
          >
            {text}
          </Text>
          {Boolean(badge) && (
            <View
              style={[
                styles.tabBadgeContainerStyle,
                tabBadgeContainerStyle,
                isTabActive
                  ? [
                      styles.activeTabBadgeContainerStyle,
                      activeTabBadgeContainerStyle
                    ]
                  : {}
              ]}
            >
              <Text
                type="medium"
                sizeType="xMedium"
                style={[
                  styles.tabBadgeStyle,
                  tabBadgeStyle,
                  isTabActive
                    ? [styles.activeTabBadgeStyle, activeTabBadgeStyle]
                    : {}
                ]}
                allowFontScaling={allowFontScaling}
              >
                {badge}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

TabOption.propTypes = {
  isTabActive: PropTypes.bool,
  index: PropTypes.number,
  badge: PropTypes.any,
  text: PropTypes.string.isRequired,
  firstTabStyle: ViewPropTypes.style,
  lastTabStyle: ViewPropTypes.style,
  tabStyle: ViewPropTypes.style,
  activeTabStyle: ViewPropTypes.style,
  tabTextStyle: Text.propTypes.style,
  activeTabTextStyle: Text.propTypes.style,
  tabBadgeContainerStyle: Text.propTypes.style,
  activeTabBadgeContainerStyle: Text.propTypes.style,
  tabBadgeStyle: Text.propTypes.style,
  activeTabBadgeStyle: Text.propTypes.style,
  onTabPress: PropTypes.func,
  textNumberOfLines: PropTypes.number,
  allowFontScaling: PropTypes.bool,
  accessible: PropTypes.any,
  activeTabOpacity: PropTypes.number,
  accessibilityLabel: PropTypes.string,
  enabled: PropTypes.bool
};

TabOption.defaultProps = {
  isTabActive: false,
  index: 0,
  badge: '',
  firstTabStyle: {},
  lastTabStyle: {},
  tabStyle: {},
  activeTabStyle: {},
  tabTextStyle: {},
  activeTabTextStyle: {},
  tabBadgeContainerStyle: {},
  activeTabBadgeContainerStyle: {},
  tabBadgeStyle: {},
  activeTabBadgeStyle: {},
  onTabPress() {},
  textNumberOfLines: 1,
  allowFontScaling: false,
  accessible: {},
  activeTabOpacity: 1,
  accessibilityLabel: '',
  enabled: false
};

const styles = StyleSheet.create({
  tabStyle: {
    height: 55,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  activeTabStyle: {
    borderBottomWidth: 5,
    borderColor: Colors.primary
  },
  tabTextStyle: {
    color: Colors.black,
    backgroundColor: 'transparent'
  },
  activeTabTextStyle: {
    color: Colors.primary
  },
  tabBadgeContainerStyle: {
    borderRadius: 20,
    backgroundColor: Colors.error,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeTabBadgeContainerStyle: {
    backgroundColor: Colors.white
  },
  tabBadgeStyle: {
    color: Colors.white
  },
  activeTabBadgeStyle: {
    color: Colors.black
  }
});
