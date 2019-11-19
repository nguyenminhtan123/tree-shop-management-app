import React from 'react';
import PropTypes from 'prop-types';
import { DatePickerIOS, StyleSheet, View } from 'react-native';
import Text from '../Text';
import { Colors } from '../../themes';

export default class CustomDatePickerIOS extends React.PureComponent {
  state = {
    date: this.props.date,
    minuteInterval: this.props.minuteInterval || 1
  };

  componentDidUpdate(prevProps) {
    if (prevProps.date.valueOf() !== this.props.date.valueOf()) {
      this.setState({
        date: this.props.date
      });
    }
  }

  handleCancel = () => {
    this.props.onCancel();
    this.resetDate();
  };

  handleConfirm = () => {
    this.props.onConfirm(this.state.date);
    this.resetDate();
  };

  resetDate = () => {
    this.setState({
      date: this.props.date
    });
  };

  handleDateChange = date => {
    this.setState({
      date
    });
    this.props.onDateChange(date);
  };

  render() {
    const {
      cancelTitle,
      confirmTitle,
      isVisible,
      minuteInterval,
      mode,
      title,
      ...otherProps
    } = this.props;

    if (isVisible) {
      return (
        <View>
          <View style={styles.titleContainer}>
            <Text
              type="medium"
              sizeType="xMedium"
              color={Colors.primary}
              onPress={this.handleCancel}
            >
              {'Cancel' || cancelTitle}
            </Text>
            <Text
              type="light"
              sizeType="xMedium"
              color={Colors.primary}
              center
              style={styles.titleStyle}
            >
              {'Pick up the time' || title}
            </Text>
            <Text
              type="medium"
              sizeType="xMedium"
              color={Colors.primary}
              onPress={this.handleConfirm}
            >
              {'Select' || confirmTitle}
            </Text>
          </View>
          <DatePickerIOS
            mode={mode}
            minuteInterval={this.state.minuteInterval}
            {...otherProps}
            date={this.state.date}
            onDateChange={this.handleDateChange}
          />
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignContent: 'center',
    justifyContent: 'space-around',
    borderColor: Colors.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  titleStyle: {
    flex: 1
  }
});

CustomDatePickerIOS.propTypes = {
  cancelTitle: PropTypes.string,
  confirmTitle: PropTypes.string,
  isVisible: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
  mode: PropTypes.oneOf(['date', 'time', 'datetime']),
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onDateChange: PropTypes.func,
  title: PropTypes.string
};

CustomDatePickerIOS.defaultProps = {
  date: new Date(),
  isVisible: false,
  mode: 'date',
  onDateChange: () => {}
};
