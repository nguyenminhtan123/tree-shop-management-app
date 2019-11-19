import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Text from './Text';

import { Colors } from '../themes';

class ViewMoreText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullTextShown: true,
      numberOfLines: this.props.numberOfLines
    };
    this.trimmedTextHeight = null;
    this.fullTextHeight = null;
    this.shouldShowMore = false;
  }

  onLayoutTrimmedText = event => {
    const { height } = event.nativeEvent.layout;
    this.trimmedTextHeight = height;
    this.hideFullText();
  };

  onLayoutFullText = event => {
    const { height } = event.nativeEvent.layout;

    this.fullTextHeight = height;
    this.hideFullText();
  };

  onPressMore = () => {
    this.setState(
      {
        numberOfLines: null
      },
      () => {
        this.props.afterExpand();
      }
    );
  };

  onPressLess = () => {
    this.setState(
      {
        numberOfLines: this.props.numberOfLines
      },
      () => {
        this.props.afterCollapse();
      }
    );
  };

  getWrapperStyle = () => {
    if (this.state.isFullTextShown) {
      return styles.transparent;
    }
    return {};
  };

  hideFullText = () => {
    if (
      this.state.isFullTextShown &&
      this.trimmedTextHeight &&
      this.fullTextHeight
    ) {
      this.shouldShowMore = this.trimmedTextHeight < this.fullTextHeight;
      this.setState({
        isFullTextShown: false
      });
    }
  };

  renderViewMore = () => {
    const { textViewMoreStyle } = this.props;
    return (
      <Text
        type="regular"
        sizeType="medium"
        color={Colors.primary}
        style={textViewMoreStyle}
        onPress={this.onPressMore}
      >
        {'See more'}
      </Text>
    );
  };

  renderViewLess = () => {
    const { textViewLessStyle } = this.props;
    return (
      <Text
        type="regular"
        sizeType="medium"
        color={Colors.primary}
        style={textViewLessStyle}
        onPress={this.onPressLess}
      >
        {'See less'}
      </Text>
    );
  };

  renderFooter = () => {
    const { numberOfLines } = this.state;

    if (this.shouldShowMore === true) {
      if (numberOfLines > 0) {
        return (this.props.renderViewMore || this.renderViewMore)(
          this.onPressMore
        );
      }
      return (this.props.renderViewLess || this.renderViewLess)(
        this.onPressLess
      );
    }
    return null;
  };

  renderFullText = () => {
    if (this.state.isFullTextShown) {
      return (
        <View onLayout={this.onLayoutFullText} style={styles.fullTextWrapper}>
          <Text type="regular" sizeType="medium" style={this.props.textStyle}>
            {this.props.description}
          </Text>
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <View style={this.getWrapperStyle()}>
        <View onLayout={this.onLayoutTrimmedText}>
          <Text
            type="regular"
            sizeType="medium"
            style={this.props.textStyle}
            numberOfLines={this.state.numberOfLines}
          >
            {this.props.description}
          </Text>
          {this.renderFooter()}
        </View>
        {this.renderFullText()}
      </View>
    );
  }
}
ViewMoreText.defaultProps = {
  afterCollapse: () => {},
  afterExpand: () => {},
  textStyle: {}
};

ViewMoreText.propTypes = {
  renderViewMore: PropTypes.func,
  renderViewLess: PropTypes.func,
  afterCollapse: PropTypes.func,
  afterExpand: PropTypes.func,
  textViewLessStyle: Text.propTypes.style,
  textViewMoreStyle: Text.propTypes.style,
  numberOfLines: PropTypes.number.isRequired,
  textStyle: Text.propTypes.style,
  description: PropTypes.string
};

export default ViewMoreText;

const styles = StyleSheet.create({
  fullTextWrapper: {
    position: 'absolute',
    opacity: 0,
    left: 0,
    top: 0
  },
  transparent: {
    opacity: 0
  }
});
