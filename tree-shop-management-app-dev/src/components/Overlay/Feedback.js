import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/rnstandard';
import { dismissOverlay } from '../../navigation/navigationConfig/serviceActions';
import { Text, TouchableButton, Touchable } from '../index';

import { Colors, Metrics } from '../../themes';

export default class FeedbackPopup extends PureComponent {
  onActionButtonPress = actionFunc => {
    this.dismiss();
    if (actionFunc) actionFunc();
  };

  dismiss = () => {
    dismissOverlay(this.props.componentId);
  };

  render() {
    const actions = this.props.actions;
    return (
      <View style={styles.container}>
        <View style={styles.popup}>
          <Touchable onPress={this.dismiss} style={styles.closeButton}>
            <View style={styles.closeButton}>
              <Icon name="ic-close" color={Colors.darkGray} size={19} />
            </View>
          </Touchable>
          <Text
            type="bold"
            sizeType="xLarge"
            center
            color={Colors.black}
            style={styles.title}
          >
            {this.props.title}
          </Text>
          <View style={styles.buttonGroup}>
            <TouchableButton
              buttonColor={Colors.primary}
              style={styles.centerButton}
              title={actions[0].text}
              onPress={() => this.onActionButtonPress(actions[0].onPress)}
            />
            <TouchableButton
              isOutlineMode
              buttonColor={Colors.darkGray}
              style={styles.centerButton}
              title={actions[1].text}
              onPress={() => this.onActionButtonPress(actions[1].onPress)}
            />
          </View>
        </View>
      </View>
    );
  }
}

FeedbackPopup.propTypes = {
  componentId: PropTypes.string,
  title: PropTypes.string,
  actions: PropTypes.array
};

FeedbackPopup.defaultProps = {
  actions: []
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.shadow
  },
  popup: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'space-around'
  },
  title: {
    marginBottom: 15
  },
  centerButton: {
    width: Metrics.screenWidth - 30,
    alignSelf: 'center',
    marginBottom: 10
  },
  buttonGroup: {
    marginBottom: Platform.OS === 'android' ? 30 : 15
  },
  closeButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
