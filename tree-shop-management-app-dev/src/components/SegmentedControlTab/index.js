import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import Text from '../Text';
import TabOption from './TabOption';

const handleTabPress = (index, multiple, selectedIndex, onTabPress) => {
  if (multiple) {
    onTabPress(index);
  } else if (selectedIndex !== index) {
    onTabPress(index);
  }
};

const getAccessibilityLabelByIndex = (accessibilityLabels, index) =>
  accessibilityLabels &&
  accessibilityLabels.length > 0 &&
  accessibilityLabels[index]
    ? accessibilityLabels[index]
    : undefined;

export default class SegmentedControlTab extends PureComponent {
  render() {
    const {
      multiple,
      selectedIndex,
      selectedIndices,
      values,
      badges,
      tabsContainerStyle,
      tabsContainerDisableStyle,
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
      accessibilityLabels,
      activeTabOpacity,
      enabled
    } = this.props;

    const tabsContainerStyles = [styles.tabsContainerStyle, tabsContainerStyle];
    if (!enabled) {
      tabsContainerStyles.push(tabsContainerDisableStyle);
    }
    return (
      <View style={tabsContainerStyles} removeClippedSubviews={false}>
        {values.map((item, index) => {
          const accessibilityText = getAccessibilityLabelByIndex(
            accessibilityLabels,
            index
          );
          return (
            <TabOption
              key={`${index}${item}`}
              index={index}
              badge={badges && badges[index] ? badges[index] : false}
              isTabActive={
                multiple
                  ? selectedIndices.includes(index)
                  : selectedIndex === index
              }
              text={item}
              textNumberOfLines={textNumberOfLines}
              onTabPress={indexs =>
                handleTabPress(indexs, multiple, selectedIndex, onTabPress)
              }
              tabStyle={tabStyle}
              activeTabStyle={activeTabStyle}
              tabTextStyle={tabTextStyle}
              activeTabTextStyle={activeTabTextStyle}
              tabBadgeContainerStyle={tabBadgeContainerStyle}
              activeTabBadgeContainerStyle={activeTabBadgeContainerStyle}
              tabBadgeStyle={tabBadgeStyle}
              activeTabBadgeStyle={activeTabBadgeStyle}
              allowFontScaling={allowFontScaling}
              activeTabOpacity={activeTabOpacity}
              accessible={accessible}
              accessibilityLabel={accessibilityText || item}
              enabled={enabled}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabsContainerStyle: {
    flexDirection: 'row'
  },
  tabStyle: {}
});

SegmentedControlTab.propTypes = {
  values: PropTypes.array,
  badges: PropTypes.array,
  multiple: PropTypes.bool,
  onTabPress: PropTypes.func,
  selectedIndex: PropTypes.number,
  selectedIndices: PropTypes.arrayOf(PropTypes.number),
  tabsContainerStyle: ViewPropTypes.style,
  tabsContainerDisableStyle: ViewPropTypes.style,
  tabStyle: ViewPropTypes.style,
  activeTabStyle: ViewPropTypes.style,
  tabTextStyle: Text.propTypes.style,
  activeTabTextStyle: Text.propTypes.style,
  tabBadgeContainerStyle: Text.propTypes.style,
  activeTabBadgeContainerStyle: Text.propTypes.style,
  tabBadgeStyle: Text.propTypes.style,
  activeTabBadgeStyle: Text.propTypes.style,
  borderRadius: PropTypes.number,
  textNumberOfLines: PropTypes.number,
  allowFontScaling: PropTypes.bool,
  accessible: PropTypes.bool,
  accessibilityLabels: PropTypes.array,
  activeTabOpacity: PropTypes.number,
  enabled: PropTypes.bool
};

SegmentedControlTab.defaultProps = {
  values: ['Home', 'Cart', 'Profile'],
  accessible: true,
  accessibilityLabels: [],
  badges: ['', '', ''],
  multiple: false,
  selectedIndex: 0,
  selectedIndices: [0],
  onTabPress: () => {},
  tabsContainerStyle: {},
  tabsContainerDisableStyle: { opacity: 0.6 },
  tabStyle: {},
  activeTabStyle: {},
  tabTextStyle: {},
  activeTabTextStyle: {},
  tabBadgeContainerStyle: {},
  activeTabBadgeContainerStyle: {},
  tabBadgeStyle: {},
  activeTabBadgeStyle: {},
  textNumberOfLines: 1,
  allowFontScaling: true,
  activeTabOpacity: 1,
  enabled: true
};
