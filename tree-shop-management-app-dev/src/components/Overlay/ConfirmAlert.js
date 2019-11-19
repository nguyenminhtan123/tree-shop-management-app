import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { dismissOverlay } from '../../navigation/navigationConfig/serviceActions';
import { Text, TouchableButton } from '../index';

import { Colors, Metrics } from '../../themes';

export default class ConfirmAlert extends PureComponent {
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
          {this.props.title && (
            <Text
              type="bold"
              sizeType="xLarge"
              center
              color={Colors.primary}
              style={styles.title}
            >
              {this.props.title}
            </Text>
          )}
          <Text
            type="thin"
            sizeType="xMedium"
            color={Colors.black}
            center
            style={styles.message}
          >
            {this.props.message}
          </Text>
          {actions.length === 2 && (
            <View style={styles.rowButtonContainer}>
              <TouchableButton
                isOutlineMode
                buttonColor={Colors.primary}
                title={actions[0].text}
                style={[styles.button, { marginRight: 15 }]}
                onPress={() => this.onActionButtonPress(actions[0].onPress)}
              />
              <TouchableButton
                buttonColor={Colors.primary}
                title={actions[1].text}
                style={styles.button}
                onPress={() => this.onActionButtonPress(actions[1].onPress)}
              />
            </View>
          )}
          {actions.length === 1 && (
            <TouchableButton
              buttonColor={Colors.primary}
              style={styles.centerButton}
              title={actions[0].text}
              onPress={() => this.onActionButtonPress(actions[0].onPress)}
            />
          )}
        </View>
      </View>
    );
  }
}

ConfirmAlert.propTypes = {
  componentId: PropTypes.string,
  title: PropTypes.string,
  actions: PropTypes.array
};

ConfirmAlert.defaultProps = {
  actions: []
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.shadow
  },
  popup: {
    width: Metrics.screenWidth - 30,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 8
  },
  title: {
    marginBottom: 10
  },
  message: {
    marginBottom: 10
  },
  rowButtonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between'
  },
  button: {
    width: (Metrics.screenWidth - 30) / 2 - 30
  },
  centerButton: {
    width: Metrics.screenWidth - 60,
    alignSelf: 'center'
  }
});
