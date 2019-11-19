import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/rnstandard';
import { Colors } from '../../themes';
import { Text, Touchable } from '../index';
import {
  validateEmail,
  validatePhone,
  validateName,
  validateEmpty
} from '../../utils/functions';

export default class RoundInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || '',
      isSecure: props.secureTextEntry || false,
      borderColor: Colors.darkGray,
      isValidate: true
    };
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  clear() {
    this.input.clear();
  }

  isFocused() {
    return this.input.isFocused();
  }

  getText() {
    return this.state.isValidate ? this.input._lastNativeText : null;
  }

  onFocus() {
    const { onFocus } = this.props;
    this.setState({
      borderColor: Colors.primary
    });
    onFocus && onFocus();
  }

  onBlur = () => {
    const { onBlur, validateType } = this.props;
    onBlur && onBlur();

    const isValidate = validateField(validateType, this.input._lastNativeText);
    this.setState({ isValidate, borderColor: Colors.darkGray });
  };

  onChangeSecureState = () => {
    this.setState(previousState => ({
      isSecure: !previousState.isSecure
    }));
  };

  renderTextInput() {
    const { isSecure } = this.state;
    return (
      <View style={styles.containerInputStyle}>
        {this.renderInput()}
        {this.props.secureTextEntry && (
          <Touchable onPress={this.onChangeSecureState}>
            <View style={styles.iconSecure}>
              <Icon
                name={isSecure ? 'ic-eye-off' : 'ic-eye-on'}
                color={Colors.black}
                size={25}
              />
            </View>
          </Touchable>
        )}
      </View>
    );
  }

  renderInput() {
    const {
      textInputStyle,
      onChangeText,
      secureTextEntry,
      validateType,
      multiline
    } = this.props;

    const { isSecure, borderColor } = this.state;
    return (
      <TextInput
        {...this.props}
        ref={ref => {
          this.input = ref;
        }}
        style={[
          styles.textInput,
          {
            borderColor: borderColor,
            paddingRight: secureTextEntry ? 40 : 12
          },
          multiline && styles.multilineStyle,
          textInputStyle
        ]}
        onChangeText={text => {
          const isValidate = validateField(validateType, text);
          this.setState({ isValidate });
        }}
        value={this.state.value}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        keyboardAppearance="dark"
        selectTextOnFocus
        onChange={event => {
          this.setState({ value: event.nativeEvent.text });
          onChangeText && onChangeText(event.nativeEvent.text);
        }}
        secureTextEntry={isSecure}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
      />
    );
  }

  render() {
    const { isValidate } = this.state;
    const { containerStyle, errorMessage, isRequired } = this.props;

    const error =
      this.input && this.input._lastNativeText && isRequired
        ? errorMessage
        : 'Cannot be empty';

    return (
      <View style={containerStyle}>
        {this.renderTextInput()}
        {!isValidate && (
          <Text
            type="light"
            sizeType="small"
            color={Colors.error}
            style={styles.txtError}
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
}

RoundInput.propTypes = {
  containerStyle: PropTypes.any,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  textInputStyle: PropTypes.any,
  validateType: PropTypes.string
};

RoundInput.defaultProps = {
  containerStyle: { marginVertical: 8 },
  isRequired: true,
  textInputStyle: {}
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 48,
    paddingVertical: 8,
    paddingLeft: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    alignSelf: 'center',
    fontFamily: 'Roboto-Light',
    fontSize: 16
  },
  iconSecure: {
    position: 'absolute',
    top: 4,
    right: 8,
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  multilineStyle: {
    height: 120,
    borderRadius: 0,
    paddingLeft: 10
  },
  txtError: {
    paddingLeft: 10,
    paddingTop: 5
  },
  containerInputStyle: {
    flexDirection: 'row'
  }
});

const validateField = (validateType, input) => {
  switch (validateType) {
    case 'email':
      return validateEmail(input);
    case 'password':
      return input && input.length >= 6;
    case 'phone':
      return validatePhone(input);
    case 'username':
      return validateName(input);
    case 'empty':
      return validateEmpty(input);
    default:
      return true;
  }
};
