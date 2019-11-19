import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform } from 'react-native';
import CustomDatePickerAndroid from '../DatePicker/CustomDatePickerAndroid';
import CustomDatePickerIOS from '../DatePicker/CustomDatePickerIOS';
import { Colors, Metrics } from '../../themes';
import { dismissOverlay } from '../../navigation/navigationConfig/serviceActions';

export default class DatePickerOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.isVisible
    };
  }

  onConfirmDate = date => {
    const { onConfirmDate, componentId } = this.props;

    onConfirmDate && onConfirmDate(date);
    this.setState({ isVisible: false });
    dismissOverlay(componentId);
  };

  onCancelDate = () => {
    const { componentId } = this.props;
    this.setState({ isVisible: false });
    dismissOverlay(componentId);
  };

  render() {
    const { isVisible } = this.state;
    if (Platform.OS === 'android') {
      return (
        <CustomDatePickerAndroid
          isVisible={isVisible}
          onConfirm={this.onConfirmDate}
          onCancel={this.onCancelDate}
          {...this.props}
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.popup}>
          <CustomDatePickerIOS
            isVisible={isVisible}
            onConfirm={this.onConfirmDate}
            onCancel={this.onCancelDate}
            {...this.props}
          />
        </View>
      </View>
    );
  }
}

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
    justifyContent: 'center'
  }
});

DatePickerOverlay.propTypes = {
  isVisible: PropTypes.bool,
  componentId: PropTypes.string,
  onConfirmDate: PropTypes.func
};

DatePickerOverlay.defaultProps = {
  isVisible: false
};
