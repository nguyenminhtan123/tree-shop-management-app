import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Metrics, Colors } from '../themes';

class ViewPagerFlatList extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.flatListRef.scrollToIndex({
        index: this.props.selectedIndex,
        animated: false
      });
    }
  }

  onScrollEnd = e => {
    if (!this.props.scrollEnabled) {
      return;
    }

    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const tabIndex = Math.floor(contentOffset.x / viewSize.width);
    if (tabIndex !== this.props.selectedIndex) {
      this.props.onChangeTab(tabIndex);
    }
  };

  renderItem = ({ item, index }) => (
    <View style={[styles.card]} collapsable={false}>
      {item}
    </View>
  );

  render() {
    return (
      <FlatList
        data={this.props.children}
        keyExtractor={(item, index) => `r${index}`}
        renderItem={this.renderItem}
        ref={ref => {
          if (ref) {
            this.flatListRef = ref;
          }
        }}
        style={[styles.container, this.props.style]}
        horizontal
        pagingEnabled
        bounces={false}
        scrollsToTop={false}
        scrollEventThrottle={100}
        scrollEnabled={this.props.scrollEnabled}
        removeClippedSubviews
        automaticallyAdjustContentInsets={true}
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={this.onScrollEnd}
      />
    );
  }
}

ViewPagerFlatList.propTypes = {
  scrollEnabled: PropTypes.bool
};

ViewPagerFlatList.defaultProps = {
  scrollEnabled: false
};

export default ViewPagerFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  card: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.transparent
  }
});
