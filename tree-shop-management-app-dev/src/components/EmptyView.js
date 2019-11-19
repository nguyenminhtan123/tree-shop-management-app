import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from './index';
import { Metrics } from '../themes';

export default class EmptyView extends React.PureComponent {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <Text center type="light" sizeType="xMedium">
          {title}
        </Text>
      </View>
    );
  }
}

EmptyView.propTypes = {
  title: PropTypes.string
};

EmptyView.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    marginTop: Metrics.screenHeight / 2.5
  }
});
